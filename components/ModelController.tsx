import * as THREE from 'three';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ThreeEvent, useFrame } from '@react-three/fiber';

import { BuildingRef, Model } from '../models/Building';

export default function ModelController() {
    const router = useRouter();
    const [selectedFloor, selectFloor] = useState<number | null>(null);
    const [selectedFlat, selectFlat] = useState<string | null>(null);
    const [hoveredFlat, hoverFlat] = useState<string | null>(null);

    const modelRef = useRef<BuildingRef>(null);

    // useFrame((state, delta) => {
    //     if (modelRef.current) {
    //         for (let i = 0; i < modelRef.current.floorsCount; i++) {
    //             const currentY = modelRef.current.floorsRef[i].position.y;

    //             const initialY = modelRef.current.initialPositions[i];
    //             const targetY =
    //                 initialY +
    //                 (selectedFloor !== null && selectedFloor < i ? 100 : 0);

    //             if (currentY !== targetY) {
    //                 modelRef.current.floorsRef[i].position.y =
    //                     THREE.MathUtils.damp(currentY, targetY, 15, delta);
    //             }
    //         }
    //     }
    // });

    useEffect(() => {
        if (router.query.selectedFlat) {
            selectFlat(router.query.selectedFlat as string);
        } else {
            selectFlat(null);
        }
    }, [router.query.selectedFlat]);

    const updateRouter = useCallback(
        (id?: string) => {
            const query = { ...router.query };
            if (id === undefined) {
                delete query.selectedFlat;
                router.push({ query });
            } else if (query.selectedFlat !== id) {
                router.push({ query: { ...query, selectedFlat: id } });
            }
        },
        [router]
    );

    const handleDeselect = useCallback(() => {
        if (selectedFlat !== null) {
            selectFloor(null);
            updateRouter();
        }
    }, [selectedFlat, updateRouter]);
    const handleSelect = useCallback(
        (e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            const { name } = e.object;
            if (name.startsWith('Flat')) {
                updateRouter(e.object.name);
                const parentName = e.object.parent?.name;
                if (parentName && !Number.isNaN(+parentName)) {
                    selectFloor(+parentName);
                }
            } else {
                handleDeselect();
            }
        },
        [handleDeselect, updateRouter]
    );

    const handleFlatHover = useCallback(
        (e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            if (
                e.object.name.startsWith('Flat') &&
                e.object.name !== selectedFlat
            ) {
                hoverFlat(e.object.name);
            }
        },
        [selectedFlat]
    );
    const handleFlatUnhover = useCallback(
        (e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            if (
                e.object.name.startsWith('Flat') &&
                e.object.name !== selectedFlat
            ) {
                hoverFlat(null);
            }
        },
        [selectedFlat]
    );

    return (
        <Model
            hoveredFlat={hoveredFlat}
            selectedFlat={selectedFlat}
            selectedFloor={selectedFloor}
            ref={modelRef}
            onClick={handleSelect}
            onPointerMissed={handleDeselect}
            onPointerOver={handleFlatHover}
            onPointerOut={handleFlatUnhover}
        />
    );
}
