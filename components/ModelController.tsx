import { MathUtils } from 'three';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { type ThreeEvent, useThree } from '@react-three/fiber';
import type { CameraControls } from '@react-three/drei';

import { type BuildingProps, Model } from '../models/Building';
import { ViewModes } from './Viewer';
import { ExposureToRotationMap } from '@/utils/constants';
import useApartment from '@/utils/useApartment';
import { absoluteAngle, circularMean } from '@/utils/math';
import useBuilding from '@/utils/useBuilding';
import { Availability } from '@/types';

type ModelControllerProps = {
    buildingId: string;
    mode?: ViewModes;
    /**
     * Callback for updating cursor styling when something is hovered
     * @param isHovered is something currently hovered
     */
    onHover?: (isHovered: boolean) => void;
};

export default function ModelController({
    buildingId,
    mode = ViewModes.Overview,
    onHover,
}: ModelControllerProps) {
    const router = useRouter();
    const [hoveredApartment, hoverApartment] = useState<string | null>(null);
    const controls = useThree(
        (state) => state.controls as CameraControls | null
    );

    const buildingInfo = useBuilding(buildingId);
    const availableSelectionBoxes = useMemo(() => {
        const filteredIds = buildingInfo?.apartments
            .filter((apt) => apt.availability === Availability.Available)
            .map((apt) => apt.id);
        return new Set<string>(filteredIds);
    }, [buildingInfo?.apartments]);

    const selectedApartmentId = useMemo(() => {
        return router.query.apartmentId ?? null;
    }, [router.query.apartmentId]) as string | null;

    const selectedApartmentInfo = useApartment(selectedApartmentId);

    const selectedFloorNumber = useMemo(() => {
        if (selectedApartmentInfo && router.query.floorDetails) {
            return selectedApartmentInfo.floorNumber;
        }
        return null;
    }, [router.query.floorDetails, selectedApartmentInfo]);

    const rotateToSelectedApartment = useCallback(() => {
        if (controls) {
            const exposure = selectedApartmentInfo?.exposure;
            if (exposure) {
                const targetAngle = circularMean(
                    ...exposure.map((e) => ExposureToRotationMap[e])
                );
                const currentAngle = controls.azimuthAngle;
                const result = absoluteAngle(targetAngle, currentAngle);
                controls.rotateAzimuthTo(currentAngle + result, true);
            }
        }
    }, [controls, selectedApartmentInfo?.exposure]);

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
            rotateToSelectedApartment();
        }
        hoverApartment(null);
    }, [rotateToSelectedApartment, selectedApartmentId]);

    useEffect(() => {
        if (selectedFloorNumber !== null) {
            rotateToFloor(true);
        } else {
            rotateToFloor(false);
        }
    }, [rotateToFloor, selectedFloorNumber]);

    const handleBuildingSelect = useCallback(() => {
        router.push('/search');
    }, [router]);

    const handleBuildingHover = useCallback(() => {
        onHover?.(true);
    }, [onHover]);
    const handleBuildingUnhover = useCallback(() => {
        onHover?.(false);
    }, [onHover]);

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
            if (name.startsWith('SelectionBox')) {
                const aptId = name.slice(-3);
                updateRouter(aptId);
            } else {
                handleApartmentDeselect();
            }
        },
        [handleApartmentDeselect, updateRouter]
    );

    const handleApartmentHover = useCallback(
        (e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            const { name } = e.object;
            if (name.startsWith('SelectionBox')) {
                const aptId = name.slice(-3);
                onHover?.(true);
                if (aptId !== selectedApartmentId) {
                    hoverApartment(aptId);
                }
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

    const modelProps = useMemo<BuildingProps>(() => {
        switch (mode) {
            case ViewModes.Search: {
                return {
                    showSelectionBoxes: true,
                    showFloorLabels: true,
                    hoveredApartment: hoveredApartment,
                    selectedApartment: selectedApartmentId,
                    selectedFloorNumber: selectedFloorNumber,
                    availableSelectionBoxes: availableSelectionBoxes,
                    onClick: handleApartmentSelect,
                    onPointerMissed: handleApartmentDeselect,
                    onPointerOver: handleApartmentHover,
                    onPointerOut: handleApartmentUnhover,
                };
            }
            case ViewModes.Overview: {
                return {
                    showSelectionBoxes: false,
                    showFloorLabels: false,
                    hoveredApartment: null,
                    selectedApartment: null,
                    selectedFloorNumber: null,
                    availableSelectionBoxes: availableSelectionBoxes,
                    onClick: handleBuildingSelect,
                    onPointerOver: handleBuildingHover,
                    onPointerOut: handleBuildingUnhover,
                };
            }
            default: {
                return {
                    showSelectionBoxes: false,
                    showFloorLabels: false,
                    hoveredApartment: null,
                    selectedApartment: null,
                    selectedFloorNumber: null,
                    availableSelectionBoxes: availableSelectionBoxes,
                };
            }
        }
    }, [
        availableSelectionBoxes,
        handleApartmentDeselect,
        handleApartmentHover,
        handleApartmentSelect,
        handleApartmentUnhover,
        handleBuildingHover,
        handleBuildingSelect,
        handleBuildingUnhover,
        hoveredApartment,
        mode,
        selectedApartmentId,
        selectedFloorNumber,
    ]);

    return <Model {...modelProps} />;
}
