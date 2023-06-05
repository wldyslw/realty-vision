import { Canvas } from '@react-three/fiber';
import {
    CameraHelper,
    type OrthographicCamera,
    PerspectiveCamera,
} from 'three';
import { CameraControls, Sky, Grid, useHelper } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useControls } from 'leva';

import ModelController from './ModelController';
import { HALF_PI, TAU } from '@/utils/constants';
import CityTiles from './CityTiles';
import ViewCube from './ViewCube';

export enum ViewModes {
    Overview,
    Search,
    CrossSection,
    Hidden,
}

type ViewerProps = {
    className?: string;
};

type LightsProps = {
    viewMode: ViewModes;
    azimuth: number;
};

const showHelpers = false;

const shadowCameraArgs: Record<
    ViewModes,
    ConstructorParameters<typeof OrthographicCamera>
> = {
    [ViewModes.Overview]: [-30, 30, 50, -20, 50, 200],
    [ViewModes.Search]: [-30, 30, 50, -20, 70, 150],
    [ViewModes.CrossSection]: [-30, 30, 50, -20, 70, 100],
    [ViewModes.Hidden]: [0, 0, 0, 0, 0, 0], // can be anything, but I hope this will save some resourses
};

const cam = new PerspectiveCamera();
cam.near = 1;
cam.far = 100;

function Lights(props: LightsProps) {
    const ref = useRef<OrthographicCamera>(null);
    const { showLightHelpers } = useControls({
        showLightHelpers: {
            label: 'Show light helper',
            value: showHelpers,
        },
    });

    useHelper(
        ref.current && showLightHelpers
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
                position-x={-100 * Math.cos(props.azimuth)}
                position-y={60}
                position-z={-100 * Math.sin(props.azimuth)}
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

const maxDistance = process.env.NODE_ENV === 'development' ? 5000 : 70;
const sunAzimuth = 3.7;

const matcher =
    typeof window !== 'undefined'
        ? window.matchMedia('(min-width: 1024px)')
        : undefined;

// TODO: Solve limitation: CameraControls doesn't allow to truck&rotate on the same mouse button
export default function Viewer(props: ViewerProps) {
    const router = useRouter();
    const [hovered, hover] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [frameloop, setFrameloop] = useState<'always' | 'never'>('never');

    useEffect(() => {
        const observer = new IntersectionObserver(([{ isIntersecting }]) => {
            setFrameloop(isIntersecting ? 'always' : 'never');
        }, {});

        if (canvasRef.current) {
            observer.observe(canvasRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const [cubeShown, showCube] = useState<boolean>(matcher?.matches ?? false);

    const handleMatch = useCallback(() => {
        showCube(matcher?.matches ?? false);
    }, []);

    useEffect(() => {
        matcher?.addEventListener('change', handleMatch);
        return () => {
            matcher?.removeEventListener('change', handleMatch);
        };
    }, [handleMatch]);

    const { showAxesHelper, showPerformance } = useControls({
        showAxesHelper: {
            label: 'Show axes helper',
            value: showHelpers,
        },
        showPerformance: {
            label: 'Show performance monitor',
            value: showHelpers,
        },
    });

    const viewMode: ViewModes = useMemo(() => {
        if (router.pathname === '/') {
            return ViewModes.Overview;
        } else if (router.pathname.includes('/search')) {
            return ViewModes.Search;
        }
        return ViewModes.Hidden;
    }, [router.pathname]);

    return (
        <Canvas
            frameloop={frameloop}
            ref={canvasRef}
            resize={{ debounce: 5 }}
            className={`canvas ${
                viewMode === ViewModes.Hidden ? 'hidden' : ''
            } ${hovered ? 'cursor-pointer' : 'cursor-default'} ${
                props.className ?? ''
            }`}
            shadows
            camera={{ position: [60, 60, 60] }}
        >
            {cubeShown && <ViewCube onHover={hover} />}
            {showAxesHelper && <axesHelper args={[50]} />}
            {showPerformance && <Perf minimal position="bottom-right" />}
            <ModelController
                buildingId="test_tower"
                mode={viewMode}
                onHover={hover}
            />
            <CameraControls
                makeDefault
                camera-far={800}
                distance={70}
                minDistance={30}
                maxDistance={maxDistance}
                maxPolarAngle={HALF_PI}
            />
            <Lights azimuth={sunAzimuth} viewMode={viewMode} />
            <Grid
                visible={viewMode === ViewModes.Search}
                cellColor="white"
                args={[1000, 1000]}
                sectionSize={10}
                cellSize={0}
            />
            <CityTiles viewMode={viewMode} />
            <Sky
                visible={viewMode === ViewModes.Overview}
                distance={1000}
                turbidity={8}
                rayleigh={0.1}
                mieCoefficient={0.0001}
                mieDirectionalG={0.9}
                inclination={0.7}
                azimuth={sunAzimuth / TAU}
            />
            {viewMode === ViewModes.Overview && (
                <fogExp2 attach="fog" args={[0xd2e0ea, 0.002]} />
            )}
        </Canvas>
    );
}
