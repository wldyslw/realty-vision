import { useContext } from 'react';
import { ComplexInfoContext } from './contexts';

export default function useBuilding(buildingId: string | null) {
    const complexInfo = useContext(ComplexInfoContext);

    // useMemo not used here because of assumption that there's only a few buildings
    const building =
        complexInfo.data?.buildings.find((b) => b.id === buildingId) ?? null;

    return building;
}
