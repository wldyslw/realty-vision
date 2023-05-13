import * as THREE from 'three';
import { useRouter } from 'next/router';
import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import type { CameraControls } from '@react-three/drei';

import { BuildingProps, BuildingRef, Model } from '../models/Building';
import { Exposure } from '@/types';
import { ViewModes } from './Viewer';
import { ComplexInfoContext } from '@/utils/globalContext';

type ModelControllerProps = {
    mode?: ViewModes;
    /**
     * Callback for updating cursor styling when something is hovered
     * @param isHovered is something currently hovered
     */
    onHover?: (isHovered: boolean) => void;
};

const ExposureToRotationMap: Record<Exposure, number> = {
    N: 0,
    W: Math.PI / 2,
    S: Math.PI,
    E: (Math.PI * 3) / 2,
};

function circularMean(...angles: number[]) {
    return Math.atan2(
        angles.reduce((acc, a) => acc + Math.sin(a), 0),
        angles.reduce((acc, a) => acc + Math.cos(a), 0)
    );
}

export default function ModelController({
    mode = ViewModes.Overview,
    onHover,
}: ModelControllerProps) {
    const router = useRouter();
    const [selectedFloor, selectFloor] = useState<number | null>(null);
    const [selectedApartment, selectApartment] = useState<string | null>(null);
    const [hoveredApartment, hoverApartment] = useState<string | null>(null);
    const { controls }: { controls: CameraControls } = useThree();

    const modelRef = useRef<BuildingRef>(null);

    const handleBuildingSelect = useCallback(() => {
        router.push('/search');
    }, [router]);

    const handleBuildingHover = useCallback(() => {
        onHover?.(true);
    }, [onHover]);
    const handleBuildingUnhover = useCallback(() => {
        onHover?.(false);
    }, [onHover]);

    useFrame((state, delta) => {
        if (modelRef.current) {
            for (let i = 0; i < modelRef.current.floorsCount; i++) {
                const currentY = modelRef.current.floorsRef[i].position.y;

                const initialY = modelRef.current.initialPositions[i];
                const targetY =
                    initialY +
                    (selectedFloor !== null && selectedFloor < i ? 100 : 0);

                if (currentY !== targetY) {
                    modelRef.current.floorsRef[i].position.y =
                        THREE.MathUtils.damp(currentY, targetY, 15, delta);
                }
            }
        }
    });

    const complexInfo = useContext(ComplexInfoContext);

    const rotateToApartment = useCallback(
        (id: string) => {
            if (controls) {
                const exposure = complexInfo.data?.buildings[0].apartments.find(
                    (apt) => apt.id === id
                )?.exposure;
                if (exposure) {
                    const angle = circularMean(
                        ...exposure.map((e) => ExposureToRotationMap[e])
                    );
                    controls.rotateAzimuthTo(angle, true);
                }
            }
        },
        [complexInfo.data?.buildings, controls]
    );

    const rotateToFloor = useCallback(
        (showDetails: boolean) => {
            controls?.rotatePolarTo(
                (showDetails ? 30 : 60) * THREE.MathUtils.DEG2RAD,
                true
            );
        },
        [controls]
    );

    useEffect(() => {
        if (router.query.apartmentId) {
            const id = decodeURIComponent(router.query.apartmentId as string);
            selectApartment(id);
            rotateToApartment(id);
        } else {
            selectApartment(null);
        }
        hoverApartment(null);
    }, [router.query.apartmentId, rotateToApartment]);

    useEffect(() => {
        const floorDetails = router.query.floorDetails;
        if (floorDetails !== undefined && !Number.isNaN(+floorDetails)) {
            selectFloor(+floorDetails - 1);
            rotateToFloor(true);
        } else {
            selectFloor(null);
            rotateToFloor(false);
        }
    }, [rotateToFloor, router.query.floorDetails]);

    const updateRouter = useCallback(
        (id?: string) => {
            const { apartmentId } = router.query;
            if (id === undefined) {
                router.push('/search');
            } else if (apartmentId !== id) {
                router.push({
                    query: {
                        ...router.query,
                        apartmentId: encodeURIComponent(id),
                    },
                });
            }
        },
        [router]
    );

    const handleApartmentDeselect = useCallback(() => {
        if (selectedApartment !== null) {
            // selectFloor(null);
            updateRouter();
        }
    }, [selectedApartment, updateRouter]);
    const handleApartmentSelect = useCallback(
        (e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            const { name } = e.object;
            if (name.startsWith('Flat')) {
                updateRouter(e.object.name);
                rotateToApartment(e.object.name);
                const parentName = e.object.parent?.name;
                if (parentName && !Number.isNaN(+parentName)) {
                    // selectFloor(+parentName);
                }
            } else {
                handleApartmentDeselect();
            }
        },
        [handleApartmentDeselect, rotateToApartment, updateRouter]
    );

    const handleApartmentHover = useCallback(
        (e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            if (
                e.object.name.startsWith('Flat') &&
                e.object.name !== selectedApartment
            ) {
                hoverApartment(e.object.name);
                onHover?.(true);
            }
        },
        [onHover, selectedApartment]
    );
    const handleApartmentUnhover = useCallback(
        (e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            hoverApartment(null);
            onHover?.(false);
        },
        [onHover]
    );

    const modelProps = useMemo<Partial<BuildingProps>>(() => {
        switch (mode) {
            case ViewModes.Search: {
                return {
                    showFloorLabels: true,
                    hoveredFlat: hoveredApartment,
                    selectedApartment: selectedApartment,
                    selectedFloor: selectedFloor,
                    onClick: handleApartmentSelect,
                    onPointerMissed: handleApartmentDeselect,
                    onPointerOver: handleApartmentHover,
                    onPointerOut: handleApartmentUnhover,
                };
            }
            case ViewModes.Overview: {
                return {
                    showFloorLabels: false,
                    hoveredFlat: null,
                    selectedApartment: null,
                    selectedFloor: null,
                    onClick: handleBuildingSelect,
                    onPointerOver: handleBuildingHover,
                    onPointerOut: handleBuildingUnhover,
                };
            }
            default: {
                return {};
            }
        }
    }, [
        mode,
        hoveredApartment,
        selectedApartment,
        selectedFloor,
        handleApartmentSelect,
        handleApartmentDeselect,
        handleApartmentHover,
        handleApartmentUnhover,
        handleBuildingSelect,
        handleBuildingHover,
        handleBuildingUnhover,
    ]);

    return <Model {...modelProps} showApartmentLabels ref={modelRef} />;
}
