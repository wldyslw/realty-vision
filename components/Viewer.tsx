import { Canvas } from '@react-three/fiber';
import {
    CameraControls,
    PerformanceMonitor,
    Sky,
    Grid,
} from '@react-three/drei';
import { Model } from '../models/Building';
import { Perf } from 'r3f-perf';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import ModelController from './ModelController';

export default function Viewer() {
    const router = useRouter();

    const handleModelClick = useCallback(() => {
        router.push({ query: { p: 'search' } });
    }, [router]);

    return (
        <Canvas shadows camera={{ position: [60, 60, 60] }}>
            <ModelController />
            <Perf position="top-left" />
            <PerformanceMonitor></PerformanceMonitor>
            <CameraControls minDistance={30} makeDefault />

            <pointLight position={[30, 60, 30]} intensity={2} />
            <pointLight position={[-30, 60, -30]} intensity={2} />
            <ambientLight intensity={0.4} />

            <Grid cellColor="white" infiniteGrid sectionSize={10} />

            <Sky inclination={0.51} />
        </Canvas>
    );
}
