import { Canvas } from '@react-three/fiber';
import { CameraControls, Sky, Grid, useHelper } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import ModelController from './ModelController';
import { HALF_PI } from '@/utils/constants';
import { Model as City } from '@/models/City_001';
import { CameraHelper, type OrthographicCamera } from 'three';

export enum ViewModes {
    Overview,
    Search,
    CrossSection,
}

type ViewerProps = {
    className?: string;
};

type LightsProps = {
    viewMode: ViewModes;
};

const shadowCameraArgs: Record<
    ViewModes,
    ConstructorParameters<typeof OrthographicCamera>
> = {
    [ViewModes.Overview]: [-120, 120, 100, -80, 1, 300],
    [ViewModes.Search]: [-50, 50, 50, -30, 120, 200],
    [ViewModes.CrossSection]: [-50, 50, 50, -30, 120, 200],
};

function Lights(props: LightsProps) {
    const ref = useRef<OrthographicCamera>(null);
    useHelper(
        ref.current && process.env.NODE_ENV !== 'production'
            ? (ref as React.MutableRefObject<OrthographicCamera>)
            : false,
        CameraHelper
    );

    return (
        <>
            <directionalLight
                shadow-mapSize={[2048, 2048]}
                castShadow
                intensity={2}
                position={[-100, 100, -100]}
                shadow-bias={-0.001}
            >
                <orthographicCamera
                    ref={ref}
                    attach="shadow-camera"
                    args={shadowCameraArgs[props.viewMode]}
                />
            </directionalLight>
            <ambientLight intensity={0.2} />
        </>
    );
}

const maxDistance = process.env.NODE_ENV === 'development' ? 500 : 70;

// TODO: Solve limitation: CameraControls doesn't allow to truck&rotate on the same mouse button
export default function Viewer(props: ViewerProps) {
    const router = useRouter();
    const [hovered, hover] = useState(false);

    const viewMode: ViewModes = useMemo(() => {
        if (router.pathname.includes('search')) {
            return ViewModes.Search;
        }
        return ViewModes.Overview;
    }, [router.pathname]);

    return (
        <Canvas
            resize={{ debounce: 5 }}
            className={
                (props.className ?? '') +
                (hovered ? 'cursor-pointer' : 'cursor-default')
            }
            shadows
            camera={{ position: [60, 60, 60] }}
        >
            {process.env.NODE_ENV === 'development' && (
                <>
                    <axesHelper args={[50]} />
                    <Perf minimal position="bottom-right" />
                </>
            )}
            <ModelController
                buildingId="test_tower"
                mode={viewMode}
                onHover={hover}
            />
            <CameraControls
                makeDefault
                distance={70}
                minDistance={30}
                maxDistance={maxDistance}
                maxPolarAngle={HALF_PI}
            />

            <Lights viewMode={viewMode} />

            {viewMode !== ViewModes.Overview && (
                <Grid
                    cellColor="white"
                    args={[1000, 1000]}
                    sectionSize={10}
                    cellSize={0}
                />
            )}

            <City
                visible={viewMode === ViewModes.Overview}
                scale={2}
                position={[-1.3, 0, 0.5]}
            />
            {viewMode === ViewModes.Overview && (
                <>
                    <Sky
                        distance={1000}
                        turbidity={8}
                        rayleigh={0.1}
                        mieCoefficient={0.0001}
                        mieDirectionalG={0.9}
                        inclination={0.7}
                    />
                    <fogExp2 attach="fog" args={[0xd2e0ea, 0.007]} />
                </>
            )}
        </Canvas>
    );
}
