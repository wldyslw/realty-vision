import { MathUtils } from 'three';
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
import { TAU } from '@/utils/constants';

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

function absoluteAngle(targetAngle: number, sourceAngle: number) {
    const angle = targetAngle - sourceAngle;
    return MathUtils.euclideanModulo(angle + Math.PI, TAU) - Math.PI;
}

export default function ModelController({
    mode = ViewModes.Overview,
    onHover,
}: ModelControllerProps) {
    const router = useRouter();
    const [hoveredApartment, hoverApartment] = useState<string | null>(null);
    const controls = useThree(
        (state) => state.controls as CameraControls | null
    );
    const complexInfo = useContext(ComplexInfoContext);

    const selectedApartmentId = useMemo(() => {
        return router.query.apartmentId ?? null;
    }, [router.query.apartmentId]) as string | null;

    const selectedApartmentInfo = useMemo(() => {
        return (
            complexInfo.data?.buildings[0].apartments.find(
                (apt) => apt.id === selectedApartmentId
            ) ?? null
        );
    }, [complexInfo.data?.buildings, selectedApartmentId]);

    const selectedFloorNumber = useMemo(() => {
        if (selectedApartmentInfo && router.query.floorDetails) {
            return selectedApartmentInfo.floorNumber;
        }
        return null;
    }, [router.query.floorDetails, selectedApartmentInfo]);

    const rotateToApartment = useCallback(
        (id: string) => {
            if (controls) {
                const exposure = complexInfo.data?.buildings[0].apartments.find(
                    (apt) => apt.id === id
                )?.exposure;
                if (exposure) {
                    const targetAngle = circularMean(
                        ...exposure.map((e) => ExposureToRotationMap[e])
                    );
                    const currentAngle = controls.azimuthAngle;
                    const result = absoluteAngle(targetAngle, currentAngle);
                    controls.rotateAzimuthTo(currentAngle + result, true);
                }
            }
        },
        [complexInfo.data?.buildings, controls]
    );

    const rotateToFloor = useCallback(
        (showDetails: boolean) => {
            controls?.rotatePolarTo(
                (showDetails ? 30 : 60) * MathUtils.DEG2RAD,
                true
            );
        },
        [controls]
    );

    useEffect(() => {
        if (selectedApartmentId) {
            rotateToApartment(selectedApartmentId);
        }
        hoverApartment(null);
    }, [rotateToApartment, selectedApartmentId]);

    useEffect(() => {
        if (selectedFloorNumber !== null) {
            rotateToFloor(true);
        } else {
            rotateToFloor(false);
        }
    }, [rotateToFloor, selectedFloorNumber]);

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
                    (selectedFloorNumber !== null && selectedFloorNumber < i + 1
                        ? 100
                        : 0);

                if (currentY !== targetY) {
                    modelRef.current.floorsRef[i].position.y = MathUtils.damp(
                        currentY,
                        targetY,
                        15,
                        delta
                    );
                }
            }
        }
    });

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
        if (selectedApartmentId !== null) {
            updateRouter();
        }
    }, [selectedApartmentId, updateRouter]);
    const handleApartmentSelect = useCallback(
        (e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            const { name } = e.object;
            if (name.startsWith('Flat')) {
                updateRouter(e.object.name);
                rotateToApartment(e.object.name);
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
                e.object.name !== selectedApartmentId
            ) {
                hoverApartment(e.object.name);
                onHover?.(true);
            }
        },
        [onHover, selectedApartmentId]
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
                    selectedApartment: selectedApartmentId,
                    selectedFloor: selectedFloorNumber,
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
        selectedApartmentId,
        selectedFloorNumber,
        handleApartmentSelect,
        handleApartmentDeselect,
        handleApartmentHover,
        handleApartmentUnhover,
        handleBuildingSelect,
        handleBuildingHover,
        handleBuildingUnhover,
    ]);

    return <Model {...modelProps} ref={modelRef} />;
}
