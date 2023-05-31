import type { Exposure } from '@/types';

export const HALF_PI = Math.PI / 2;
export const TAU = Math.PI * 2;

function getExposureToRotationMap(
    northRotation: number
): Record<Exposure, number> {
    return {
        N: northRotation,
        W: northRotation + Math.PI / 2,
        S: northRotation + Math.PI,
        E: northRotation + (Math.PI * 3) / 2,
    };
}

export const ExposureToRotationMap = getExposureToRotationMap(0);

export const PersistedQueryStorageKey = 'persistedQuery';
