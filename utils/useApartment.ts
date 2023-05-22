import { useContext, useMemo } from 'react';
import { ComplexInfoContext } from './contexts';
import type { Apartment } from '@/types';

export default function useApartment(apartmentId: string | null) {
    const complexInfo = useContext(ComplexInfoContext);

    const apartmentInfo: Apartment | null = useMemo(() => {
        if (apartmentId === null) {
            return null;
        }

        return (
            complexInfo.data?.buildings
                .flatMap((b) => b.apartments)
                .find((apt) => apt.id === apartmentId) ?? null
        );
    }, [apartmentId, complexInfo.data?.buildings]);

    return apartmentInfo;
}
