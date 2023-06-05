import * as r3fd from '@react-three/drei';

declare module '@react-three/drei' {
    declare type Props = {
        distance?: number;
        sunPosition?: ReactThreeFiber.Vector3;
        inclination?: number;
        azimuth?: number;
        mieCoefficient?: number;
        mieDirectionalG?: number;
        rayleigh?: number;
        turbidity?: number;
        visible?: boolean;
    };
    export declare function calcPosFromAngles(
        inclination: number,
        azimuth: number,
        vector?: Vector3
    ): Vector3;
    export declare const Sky: React.ForwardRefExoticComponent<
        Props & React.RefAttributes<unknown>
    >;
    export {};
    export { r3fd };
}
