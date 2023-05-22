import { MathUtils } from 'three';
import { TAU } from './constants';

export function circularMean(...angles: number[]) {
    return Math.atan2(
        angles.reduce((acc, a) => acc + Math.sin(a), 0),
        angles.reduce((acc, a) => acc + Math.cos(a), 0)
    );
}

export function absoluteAngle(targetAngle: number, sourceAngle: number) {
    const angle = targetAngle - sourceAngle;
    return MathUtils.euclideanModulo(angle + Math.PI, TAU) - Math.PI;
}
