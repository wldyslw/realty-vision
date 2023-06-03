import { Matrix4, TextureLoader, type Mesh } from 'three';
import {
    useFrame,
    useThree,
    useLoader,
    type ThreeEvent,
} from '@react-three/fiber';
import { memo, useCallback, useRef, useState } from 'react';
import {
    type CameraControls,
    Hud,
    OrthographicCamera,
} from '@react-three/drei';

import { ExposureToRotationMap, HALF_PI } from '@/utils/constants';
import { type Exposure } from '@/types';
import { absoluteAngle } from '@/utils/math';

const cubeMaterialHelper = Array.from({ length: 6 });
const textureNames = ['WEST', 'EAST', 'TOP', 'BOTTOM', 'NORTH', 'SOUTH'];
const texureShortNames = textureNames.map((name) => name[0]);
const textureUrls = textureNames.map((name) => `/textures/${name}.png`);

type ViewCubeProps = {
    renderPriority?: number;
    matrix?: Matrix4;
    onHover?: (isHovered: boolean) => void;
};

function ViewCube({
    renderPriority = 1,
    matrix = new Matrix4(),
    onHover,
}: ViewCubeProps) {
    const mesh = useRef<Mesh | null>(null);
    const textures = useLoader(TextureLoader, textureUrls);
    const { camera, size, controls } = useThree((state) => ({
        camera: state.camera,
        size: state.size,
        controls: state.controls as CameraControls | null,
    }));
    const [hovered, hover] = useState<number | null>(null);

    useFrame(() => {
        // Spin mesh to the inverse of the default cameras matrix
        matrix.copy(camera.matrix).invert();
        mesh.current?.quaternion.setFromRotationMatrix(matrix);
    });

    const handlePointerOut = useCallback(
        (e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            hover(null);
            onHover?.(false);
        },
        [onHover]
    );

    const handlePointerMove = useCallback(
        (e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            hover(e.face?.materialIndex ?? null);
            onHover?.(true);
        },
        [onHover]
    );

    const handleClick = useCallback(
        (e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            const index = e.face?.materialIndex;
            let azimuth = ExposureToRotationMap['N'];
            let polar = HALF_PI;
            switch (index) {
                case undefined: {
                    // imposible, but needed for ts
                    break;
                }
                case 2: {
                    // top
                    polar = 0;
                    break;
                }
                case 3: {
                    // bottom, do not rotate
                    break;
                }
                default: {
                    // n, w, s, e
                    const key = texureShortNames[index] as Exposure;
                    azimuth = ExposureToRotationMap[key];
                    break;
                }
            }
            controls?.rotateTo(
                controls.azimuthAngle +
                    absoluteAngle(azimuth, controls.azimuthAngle),
                polar,
                true
            );
        },
        [controls]
    );

    return (
        <Hud renderPriority={renderPriority}>
            <OrthographicCamera makeDefault position={[0, 0, 100]} />
            <mesh
                ref={mesh}
                position={[-size.width / 2 + 50, size.height / 2 - 50, 0]}
                onPointerOut={handlePointerOut}
                onPointerMove={handlePointerMove}
                onClick={handleClick}
            >
                {cubeMaterialHelper.map((_, index) => (
                    <meshLambertMaterial
                        key={index}
                        attach={`material-${index}`}
                        map={textures[index]}
                        transparent
                        color={hovered === index ? '#d59a43' : '#a3a3a3'}
                    />
                ))}
                <boxGeometry args={[50, 50, 50]} />
            </mesh>
            <ambientLight intensity={1} />
            <pointLight position={[100, 100, 100]} intensity={0.5} />
        </Hud>
    );
}

export default memo(ViewCube);
