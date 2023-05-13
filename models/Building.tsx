/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./building.gltf --types
*/

import * as THREE from 'three';
import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useMemo,
    useCallback,
} from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
    nodes: {
        Base: THREE.Mesh;
        Common: THREE.Mesh;
        Flat001: THREE.Mesh;
        Flat002: THREE.Mesh;
        Flat003: THREE.Mesh;
        Flat004: THREE.Mesh;
        Base001: THREE.Mesh;
        Common001: THREE.Mesh;
        Flat005: THREE.Mesh;
        Flat006: THREE.Mesh;
        Flat007: THREE.Mesh;
        Flat008: THREE.Mesh;
        Base002: THREE.Mesh;
        Common002: THREE.Mesh;
        Flat009: THREE.Mesh;
        Flat010: THREE.Mesh;
        Flat011: THREE.Mesh;
        Flat012: THREE.Mesh;
        Base003: THREE.Mesh;
        Common003: THREE.Mesh;
        Flat013: THREE.Mesh;
        Flat014: THREE.Mesh;
        Flat015: THREE.Mesh;
        Flat016: THREE.Mesh;
        Base004: THREE.Mesh;
        Common004: THREE.Mesh;
        Flat017: THREE.Mesh;
        Flat018: THREE.Mesh;
        Flat019: THREE.Mesh;
        Flat020: THREE.Mesh;
        Base005: THREE.Mesh;
        Common005: THREE.Mesh;
        Flat021: THREE.Mesh;
        Flat022: THREE.Mesh;
        Flat023: THREE.Mesh;
        Flat024: THREE.Mesh;
        Base006: THREE.Mesh;
        Common006: THREE.Mesh;
        Flat025: THREE.Mesh;
        Flat026: THREE.Mesh;
        Flat027: THREE.Mesh;
        Flat028: THREE.Mesh;
        Basement: THREE.Mesh;
        Roof: THREE.Mesh;
    };
    materials: {
        DefaultMaterial: THREE.MeshStandardMaterial;
    };
};

export type BuildingProps = JSX.IntrinsicElements['group'] & {
    selectedApartment?: string | null;
    selectedFloor?: number | null;
    hoveredFlat?: string | null;
    showFloorLabels?: boolean;
};

export type BuildingRef = {
    floorsRef: THREE.Group[];
    initialPositions: number[];
    floorsCount: number;
};

// const hoverColor = 0x52b3fe;
// const selectColor = 0x0b7ec6;
const hoverColor = 0x52d960;
const selectColor = 0x13af34;

export const Model = forwardRef<BuildingRef, BuildingProps>(function Model(
    props,
    ref
) {
    const { nodes, materials } = useGLTF('/building.gltf') as GLTFResult;

    const floorsRef = useRef<THREE.Group[]>([]);
    const initialPositions = useRef<number[]>([]);

    const setRef = (ref: THREE.Group) => {
        if (ref) {
            const i = +ref.name;
            if (!floorsRef.current[i]) {
                floorsRef.current[i] = ref;
                initialPositions.current[i] = ref.position.y;
            }
        }
    };

    const HoverMaterial = useMemo(() => {
        const mat = materials.DefaultMaterial.clone();
        mat.color = new THREE.Color(hoverColor);
        mat.emissive = new THREE.Color(hoverColor);
        return mat;
    }, [materials.DefaultMaterial]);
    const SelectMaterial = useMemo(() => {
        const mat = materials.DefaultMaterial.clone();
        mat.color = new THREE.Color(selectColor);
        mat.emissive = new THREE.Color(selectColor);
        return mat;
    }, [materials.DefaultMaterial]);

    useImperativeHandle(
        ref,
        () => ({
            floorsRef: floorsRef.current,
            initialPositions: initialPositions.current,
            floorsCount: floorsRef.current.length,
        }),
        []
    );

    const getMaterial = useCallback(
        (id: string) => {
            if (props.selectedApartment === id) {
                return SelectMaterial;
            }
            if (props.hoveredFlat === id) {
                return HoverMaterial;
            }
            return materials.DefaultMaterial;
        },
        [
            HoverMaterial,
            SelectMaterial,
            materials.DefaultMaterial,
            props.hoveredFlat,
            props.selectedApartment,
        ]
    );

    return (
        <group {...props} dispose={null}>
            <group ref={setRef} name="0" position={[0, 4, 0]}>
                {props.showFloorLabels && (
                    <Html transform sprite distanceFactor={30}>
                        <div className="floor-label">01</div>
                    </Html>
                )}
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Base.geometry}
                    material={materials.DefaultMaterial}
                >
                    {/* <Edges color="white" scale={1.1} /> */}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Common.geometry}
                    material={materials.DefaultMaterial}
                    position={[0, 0.2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat001"
                    geometry={nodes.Flat001.geometry}
                    material={getMaterial('Flat001')}
                    position={[5.5, 0.2, 4.5]}
                >
                    {props.selectedFloor === 1 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">001</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat002"
                    geometry={nodes.Flat002.geometry}
                    material={getMaterial('Flat002')}
                    position={[5.5, 0.2, -4.5]}
                >
                    {props.selectedFloor === 1 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">002</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat003"
                    geometry={nodes.Flat003.geometry}
                    material={getMaterial('Flat003')}
                    position={[-5.5, 0.2, -4.5]}
                >
                    {props.selectedFloor === 1 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">003</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat004"
                    geometry={nodes.Flat004.geometry}
                    material={getMaterial('Flat004')}
                    position={[-5.5, 0.2, 4.5]}
                >
                    {props.selectedFloor === 1 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">004</div>
                        </Html>
                    )}
                </mesh>
            </group>
            <group ref={setRef} name="1" position={[0, 8.2, 0]}>
                {props.showFloorLabels && (
                    <Html transform sprite distanceFactor={30}>
                        <div className="floor-label">02</div>
                    </Html>
                )}
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Base001.geometry}
                    material={materials.DefaultMaterial}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Common001.geometry}
                    material={materials.DefaultMaterial}
                    position={[0, 0.2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat005"
                    geometry={nodes.Flat005.geometry}
                    material={getMaterial('Flat005')}
                    position={[5.5, 0.2, 4.5]}
                >
                    {props.selectedFloor === 2 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">005</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat006"
                    geometry={nodes.Flat006.geometry}
                    material={getMaterial('Flat006')}
                    position={[5.5, 0.2, -4.5]}
                >
                    {props.selectedFloor === 2 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">006</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat007"
                    geometry={nodes.Flat007.geometry}
                    material={getMaterial('Flat007')}
                    position={[-5.5, 0.2, -4.5]}
                >
                    {props.selectedFloor === 2 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">007</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat008"
                    geometry={nodes.Flat008.geometry}
                    material={getMaterial('Flat008')}
                    position={[-5.5, 0.2, 4.5]}
                >
                    {props.selectedFloor === 2 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">008</div>
                        </Html>
                    )}
                </mesh>
            </group>
            <group ref={setRef} name="2" position={[0, 12.4, 0]}>
                {props.showFloorLabels && (
                    <Html transform sprite distanceFactor={30}>
                        <div className="floor-label">03</div>
                    </Html>
                )}
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Base002.geometry}
                    material={materials.DefaultMaterial}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Common002.geometry}
                    material={materials.DefaultMaterial}
                    position={[0, 0.2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat009"
                    geometry={nodes.Flat009.geometry}
                    material={getMaterial('Flat009')}
                    position={[5.5, 0.2, 4.5]}
                >
                    {props.selectedFloor === 3 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">009</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat010"
                    geometry={nodes.Flat010.geometry}
                    material={getMaterial('Flat010')}
                    position={[5.5, 0.2, -4.5]}
                >
                    {props.selectedFloor === 3 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">010</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat011"
                    geometry={nodes.Flat011.geometry}
                    material={getMaterial('Flat011')}
                    position={[-5.5, 0.2, -4.5]}
                >
                    {props.selectedFloor === 3 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">011</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat012"
                    geometry={nodes.Flat012.geometry}
                    material={getMaterial('Flat012')}
                    position={[-5.5, 0.2, 4.5]}
                >
                    {props.selectedFloor === 3 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">012</div>
                        </Html>
                    )}
                </mesh>
            </group>
            <group ref={setRef} name="3" position={[0, 16.6, 0]}>
                {props.showFloorLabels && (
                    <Html transform sprite distanceFactor={30}>
                        <div className="floor-label">04</div>
                    </Html>
                )}
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Base003.geometry}
                    material={materials.DefaultMaterial}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Common003.geometry}
                    material={materials.DefaultMaterial}
                    position={[0, 0.2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat013"
                    geometry={nodes.Flat013.geometry}
                    material={getMaterial('Flat013')}
                    position={[5.5, 0.2, 4.5]}
                >
                    {props.selectedFloor === 4 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">013</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat014"
                    geometry={nodes.Flat014.geometry}
                    material={getMaterial('Flat014')}
                    position={[5.5, 0.2, -4.5]}
                >
                    {props.selectedFloor === 4 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">014</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat015"
                    geometry={nodes.Flat015.geometry}
                    material={getMaterial('Flat015')}
                    position={[-5.5, 0.2, -4.5]}
                >
                    {props.selectedFloor === 4 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">015</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat016"
                    geometry={nodes.Flat016.geometry}
                    material={getMaterial('Flat016')}
                    position={[-5.5, 0.2, 4.5]}
                >
                    {props.selectedFloor === 4 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">016</div>
                        </Html>
                    )}
                </mesh>
            </group>
            <group ref={setRef} name="4" position={[0, 20.8, 0]}>
                {props.showFloorLabels && (
                    <Html transform sprite distanceFactor={30}>
                        <div className="floor-label">05</div>
                    </Html>
                )}
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Base004.geometry}
                    material={materials.DefaultMaterial}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Common004.geometry}
                    material={materials.DefaultMaterial}
                    position={[0, 0.2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat017"
                    geometry={nodes.Flat017.geometry}
                    material={getMaterial('Flat017')}
                    position={[5.5, 0.2, 4.5]}
                >
                    {props.selectedFloor === 5 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">017</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat018"
                    geometry={nodes.Flat018.geometry}
                    material={getMaterial('Flat018')}
                    position={[5.5, 0.2, -4.5]}
                >
                    {props.selectedFloor === 5 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">018</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat019"
                    geometry={nodes.Flat019.geometry}
                    material={getMaterial('Flat019')}
                    position={[-5.5, 0.2, -4.5]}
                >
                    {props.selectedFloor === 5 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">019</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat020"
                    geometry={nodes.Flat020.geometry}
                    material={getMaterial('Flat020')}
                    position={[-5.5, 0.2, 4.5]}
                >
                    {props.selectedFloor === 5 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">020</div>
                        </Html>
                    )}
                </mesh>
            </group>
            <group ref={setRef} name="5" position={[0, 25, 0]}>
                {props.showFloorLabels && (
                    <Html transform sprite distanceFactor={30}>
                        <div className="floor-label">06</div>
                    </Html>
                )}
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Base005.geometry}
                    material={materials.DefaultMaterial}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Common005.geometry}
                    material={materials.DefaultMaterial}
                    position={[0, 0.2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat021"
                    geometry={nodes.Flat021.geometry}
                    material={getMaterial('Flat021')}
                    position={[5.5, 0.2, 4.5]}
                >
                    {props.selectedFloor === 6 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">021</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat022"
                    geometry={nodes.Flat022.geometry}
                    material={getMaterial('Flat022')}
                    position={[5.5, 0.2, -4.5]}
                >
                    {props.selectedFloor === 6 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">022</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat023"
                    geometry={nodes.Flat023.geometry}
                    material={getMaterial('Flat023')}
                    position={[-5.5, 0.2, -4.5]}
                >
                    {props.selectedFloor === 6 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">023</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat024"
                    geometry={nodes.Flat024.geometry}
                    material={getMaterial('Flat024')}
                    position={[-5.5, 0.2, 4.5]}
                >
                    {props.selectedFloor === 6 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">024</div>
                        </Html>
                    )}
                </mesh>
            </group>
            <group ref={setRef} name="6" position={[0, 29.2, 0]}>
                {props.showFloorLabels && (
                    <Html transform sprite distanceFactor={30}>
                        <div className="floor-label">07</div>
                    </Html>
                )}
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Base006.geometry}
                    material={materials.DefaultMaterial}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Common006.geometry}
                    material={materials.DefaultMaterial}
                    position={[0, 0.2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat025"
                    geometry={nodes.Flat025.geometry}
                    material={getMaterial('Flat025')}
                    position={[5.5, 0.2, 4.5]}
                >
                    {props.selectedFloor === 7 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">025</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat026"
                    geometry={nodes.Flat026.geometry}
                    material={getMaterial('Flat026')}
                    position={[5.5, 0.2, -4.5]}
                >
                    {props.selectedFloor === 7 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">026</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat027"
                    geometry={nodes.Flat027.geometry}
                    material={getMaterial('Flat027')}
                    position={[-5.5, 0.2, -4.5]}
                >
                    {props.selectedFloor === 7 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">027</div>
                        </Html>
                    )}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    name="Flat028"
                    geometry={nodes.Flat028.geometry}
                    material={getMaterial('Flat028')}
                    position={[-5.5, 0.2, 4.5]}
                >
                    {props.selectedFloor === 7 && (
                        <Html transform sprite distanceFactor={30}>
                            <div className="apartment-label">028</div>
                        </Html>
                    )}
                </mesh>
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Basement.geometry}
                material={materials.DefaultMaterial}
            />
            <mesh
                castShadow
                receiveShadow
                visible={
                    props.selectedFloor === null ||
                    props.selectedFloor === undefined
                }
                geometry={nodes.Roof.geometry}
                material={materials.DefaultMaterial}
                position={[0, 33.4, 0]}
            />
        </group>
    );
});

useGLTF.preload('/building.gltf');
