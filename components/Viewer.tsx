import { Canvas } from '@react-three/fiber';
import {
    CameraControls,
    PerformanceMonitor,
    Sky,
    Grid,
} from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import ModelController from './ModelController';
import { HALF_PI } from '@/utils/constants';
import { Model as City } from '@/models/City';

export enum ViewModes {
    Overview,
    Search,
    CrossSection,
}

type ViewerProps = {
    className?: string;
};

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
            <ModelController mode={viewMode} onHover={hover} />
            <Perf position="bottom-right" />
            <PerformanceMonitor></PerformanceMonitor>
            <CameraControls
                makeDefault
                minDistance={30}
                maxDistance={100}
                maxPolarAngle={HALF_PI}
            />

            <pointLight
                shadow-mapSize={[1024, 1024]}
                intensity={2}
                position={[30, 30, 30]}
                shadow-bias={-0.001}
            />
            <pointLight
                shadow-mapSize={[1024, 1024]}
                castShadow
                intensity={2}
                position={[-30, 30, -30]}
                shadow-bias={-0.001}
            />
            <ambientLight intensity={0.2} />

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
