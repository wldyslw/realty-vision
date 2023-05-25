import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { type Apartment, Availability } from '@/types';

type UseFilteredApartmentsType = {
    availableApartments: Apartment[] | undefined;
    filteredApartments: Apartment[] | undefined;
};

export function useFilteredApartments(
    apartments?: Apartment[]
): UseFilteredApartmentsType {
    const router = useRouter();

    const availableApartments = useMemo(
        () =>
            apartments?.filter(
                (apt) => apt.availability === Availability.Available
            ),
        [apartments]
    );

    const exposureFilter = useMemo(
        () => new Set(router.query.exposureFilter),
        [router.query.exposureFilter]
    );

    const roomsNumberFilter = useMemo(() => {
        const filter = router.query.roomsNumberFilter;
        if (typeof filter === 'string') {
            return new Set([+filter]);
        }
        return new Set((filter as string[] | undefined)?.map((e) => +e));
    }, [router.query.roomsNumberFilter]);

    const floorNumberFilter = useMemo(() => {
        const filter = router.query.floorNumberFilter;
        return filter ? (filter as string[]).map((e) => +e) : null;
    }, [router.query.floorNumberFilter]);

    const filteredApartments = useMemo(() => {
        return availableApartments?.filter((apt) => {
            if (
                roomsNumberFilter.size > 0 &&
                !roomsNumberFilter.has(apt.roomsNumber)
            ) {
                return false;
            }

            if (floorNumberFilter && floorNumberFilter.length === 2) {
                const [min, max] = floorNumberFilter;
                if (apt.floorNumber < min || apt.floorNumber > max) {
                    return false;
                }
            }

            if (exposureFilter.size > 0) {
                return apt.exposure.some((exposure) =>
                    exposureFilter.has(exposure)
                );
            }
            return true;
        });
    }, [
        availableApartments,
        exposureFilter,
        floorNumberFilter,
        roomsNumberFilter,
    ]);

    const result = useMemo(
        () => ({
            availableApartments,
            filteredApartments,
        }),
        [availableApartments, filteredApartments]
    );

    return result;
}

export default useFilteredApartments;
