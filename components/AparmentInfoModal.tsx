import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useMemo } from 'react';

import { ComplexInfoContext } from '@/utils/globalContext';

export default function ApartmentInfo() {
    const router = useRouter();
    const apartmentId = router.query.apartmentId as string;

    const complexInfo = useContext(ComplexInfoContext);
    const apartmentInfo = useMemo(() => {
        return (
            complexInfo.data?.buildings[0].apartments.find(
                (apt) => apt.id === apartmentId
            ) ?? null
        );
    }, [apartmentId, complexInfo.data?.buildings]);

    const floorDetails = !!router.query.floorDetails;

    const toggleFloorDetails = useCallback(() => {
        const query = { ...router.query };
        if (floorDetails) {
            delete query.floorDetails;
        } else if (apartmentInfo) {
            query.floorDetails = apartmentInfo.floorNumber.toString();
        }
        router.push({ query });
    }, [apartmentInfo, floorDetails, router]);

    useEffect(() => {
        if (
            router.query.floorDetails &&
            +router.query.floorDetails !== apartmentInfo?.floorNumber
        ) {
            router.push({
                query: {
                    ...router.query,
                    floorDetails: apartmentInfo?.floorNumber,
                },
            });
        }
    }, [apartmentInfo?.floorNumber, router]);

    return (
        <aside className="absolute right-4 top-4 z-10 w-64 rounded-md bg-white p-4 dark:bg-gray-900">
            <div>
                <Link href="/search">x</Link>
            </div>
            <div>
                <h1 className="text-2xl">{apartmentInfo?.name ?? ''}</h1>
                <hr className="my-2" />
                <h2>Floor: {apartmentInfo?.floorNumber}</h2>
                <h2>Exposure: {apartmentInfo?.exposure.join(', ')}</h2>
                <h2>Area: {apartmentInfo?.fullArea}</h2>
                <h2>Balcony: {apartmentInfo?.balconyArea}</h2>
                <hr className="my-2" />
                <button
                    onClick={toggleFloorDetails}
                    className="rounded bg-gray-900 px-4 py-2 text-white dark:bg-white dark:text-black"
                >
                    {floorDetails ? 'Back' : 'Show floor plan'}
                </button>
            </div>
        </aside>
    );
}
