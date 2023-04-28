import { MathUtils } from 'three';

export function easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function easeInOutSine(x: number): number {
    return -(Math.cos(Math.PI * x) - 1) / 2;
}

export function easeInOutQuad(x: number): number {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

export const damp = (x: number, y: number, lambda: number, dt: number) => {
    if (Math.abs(x - y) < 0.01) {
        return y;
    }
    return MathUtils.lerp(x, y, easeInOutQuad(dt * lambda));
};
