import { Canvas } from '@react-three/fiber';
import { CameraControls, Sky, Grid } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { RefObject, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import ModelController from './ModelController';
import { HALF_PI } from '@/utils/constants';
import { Model as City } from '@/models/City';
import { type PointLight } from 'three';

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

function Lights(props: LightsProps) {
    const ref = useRef<PointLight>();
    return (
        <>
            <pointLight
                ref={ref as RefObject<PointLight>}
                shadow-mapSize={[2048, 2048]}
                shadow-camera-far={500}
                castShadow
                intensity={2}
                position={[-100, 100, -100]}
                shadow-bias={-0.001}
            />
            {props.viewMode !== ViewModes.Overview && (
                <pointLight
                    shadow-mapSize={[2048, 2048]}
                    castShadow
                    intensity={2}
                    position={[100, 100, 100]}
                    shadow-bias={-0.001}
                />
            )}
            <ambientLight intensity={0.2} />
        </>
    );
}

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
                    <Perf minimal position="top-right" />
                </>
            )}
            <ModelController mode={viewMode} onHover={hover} />
            <CameraControls
                makeDefault
                minDistance={30}
                maxDistance={100}
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

            {viewMode === ViewModes.Overview && (
                <>
                    <City />
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
