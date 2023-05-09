import * as THREE from 'three';
import { useRouter } from 'next/router';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { ThreeEvent, useFrame } from '@react-three/fiber';

import { BuildingProps, BuildingRef, Model } from '../models/Building';
import { ViewModes } from './Viewer';

type ModelControllerProps = {
    mode?: ViewModes;
    /**
     * Callback for updating cursor styling when something is hovered
     * @param isHovered is something currently hovered
     */
    onHover?: (isHovered: boolean) => void;
};

export default function ModelController({
    mode = ViewModes.Overview,
    onHover,
}: ModelControllerProps) {
    const router = useRouter();
    const [selectedFloor, selectFloor] = useState<number | null>(null);
    const [selectedApartment, selectApartment] = useState<string | null>(null);
    const [hoveredApartment, hoverApartment] = useState<string | null>(null);

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

    useEffect(() => {
        if (router.query.apartmentId) {
            selectApartment(
                decodeURIComponent(router.query.apartmentId as string)
            );
        } else {
            selectApartment(null);
        }
        hoverApartment(null);
    }, [router.query.apartmentId]);

    useEffect(() => {
        const floorDetails = router.query.floorDetails;
        if (floorDetails !== undefined && !Number.isNaN(+floorDetails)) {
            selectFloor(+floorDetails - 1);
        } else {
            selectFloor(null);
        }
    }, [router.query.floorDetails]);

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
                const parentName = e.object.parent?.name;
                if (parentName && !Number.isNaN(+parentName)) {
                    // selectFloor(+parentName);
                }
            } else {
                handleApartmentDeselect();
            }
        },
        [handleApartmentDeselect, updateRouter]
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
                    showLabels: true,
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
                    showLabels: false,
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

    return <Model {...modelProps} ref={modelRef} />;
}
