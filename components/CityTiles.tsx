import { useFrame, useThree } from '@react-three/fiber';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'; // replace this with three-stdlib
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // replace this with three-stdlib
import { Box3, Sphere, Matrix4, Vector3, Quaternion } from 'three';
import { memo, useEffect, useRef } from 'react';
import { TilesRenderer } from '3d-tiles-renderer';

import { ViewModes } from './Viewer';

function rotationBetweenDirections(dir1: Vector3, dir2: Vector3) {
    const rotation = new Quaternion();
    const a = new Vector3().crossVectors(dir1, dir2);
    rotation.x = a.x;
    rotation.y = a.y;
    rotation.z = a.z;
    rotation.w = 1 + dir1.clone().dot(dir2);
    rotation.normalize();

    return rotation;
}

type CityTilesProps = {
    viewMode: ViewModes;
};

// TODO: remove this dirty hack and use performance callback of r3f
const matcher =
    typeof window !== 'undefined'
        ? window.matchMedia('(min-width: 1024px)')
        : undefined;

// TODO: add shadows (.recieveShadow is too expensive and unavailable on MeshBasicMaterial)
function CityTiles(props: CityTilesProps) {
    const { camera, renderer, scene } = useThree((state) => ({
        camera: state.camera,
        renderer: state.gl,
        scene: state.scene,
    }));
    const tilesRenderer = useRef<TilesRenderer | null>(null);

    useEffect(() => {
        if (tilesRenderer.current === null) {
            tilesRenderer.current = new TilesRenderer(
                process.env.NEXT_PUBLIC_TILESET_URL
            );

            tilesRenderer.current.maxDepth = matcher?.matches ?? true ? 16 : 14;

            tilesRenderer.current.preprocessURL = (uri) => {
                // if tiles and web app have different origins, double slashes may appear
                const regex = /(?<!http(s)?:)\/\//;
                return uri.toString().replace(regex, '/');
            };

            tilesRenderer.current.setCamera(camera);
            tilesRenderer.current.setResolutionFromRenderer(camera, renderer);

            tilesRenderer.current.onLoadTileSet = () => {
                if (tilesRenderer.current) {
                    const box = new Box3();
                    const sphere = new Sphere();
                    const matrix = new Matrix4();

                    let position;
                    let distanceToEllipsoidCenter;

                    if (tilesRenderer.current.getOrientedBounds(box, matrix)) {
                        position = new Vector3().setFromMatrixPosition(matrix);
                        distanceToEllipsoidCenter = position.length();
                    } else if (
                        tilesRenderer.current.getBoundingSphere(sphere)
                    ) {
                        position = sphere.center.clone();
                        distanceToEllipsoidCenter = position.length();
                    } else {
                        position = new Vector3();
                        distanceToEllipsoidCenter = position.length();
                    }

                    const surfaceDirection = position.normalize();
                    const up = new Vector3(0, 1, 0);
                    const rotationToNorthPole = rotationBetweenDirections(
                        surfaceDirection,
                        up
                    );

                    tilesRenderer.current.group.quaternion.x =
                        rotationToNorthPole.x;
                    tilesRenderer.current.group.quaternion.y =
                        rotationToNorthPole.y;
                    tilesRenderer.current.group.quaternion.z =
                        rotationToNorthPole.z;
                    tilesRenderer.current.group.quaternion.w =
                        rotationToNorthPole.w;

                    tilesRenderer.current.group.position.x = -94;
                    tilesRenderer.current.group.position.y =
                        -distanceToEllipsoidCenter - 54;
                    tilesRenderer.current.group.position.z = -267;
                }
            };

            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('/draco/gltf/');

            const loader = new GLTFLoader(tilesRenderer.current.manager);
            loader.setDRACOLoader(dracoLoader);

            tilesRenderer.current.manager.addHandler(/\.gltf$/, loader);
        }

        return () => {
            tilesRenderer.current?.dispose();
            tilesRenderer.current = null;
        };
    }, [camera, renderer, scene]);

    useFrame(() => {
        try {
            if (props.viewMode === ViewModes.Overview) {
                tilesRenderer.current?.update();
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
        }
    });

    return tilesRenderer.current?.group ? (
        <primitive
            visible={props.viewMode === ViewModes.Overview}
            object={tilesRenderer.current.group}
        />
    ) : null;
}

export default memo(CityTiles);
