import { useContext, useMemo } from 'react';
import { ComplexInfoContext } from './contexts';

export default function useApartment(apartmentId: string | null) {
    const complexInfo = useContext(ComplexInfoContext);

    const apartmentInfo = useMemo(() => {
        if (apartmentId === null) {
            return null;
        }
        return (
            complexInfo.data?.buildings[0].apartments.find(
                (apt) => apt.id === apartmentId
            ) ?? null
        );
    }, [apartmentId, complexInfo.data?.buildings]);

    return apartmentInfo;
}
