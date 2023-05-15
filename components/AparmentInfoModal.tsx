import { useRouter } from 'next/router';
import { useContext, useMemo } from 'react';

import { ComplexInfoContext } from '@/utils/globalContext';
import IconLink from './IconLink';
import type { Apartment } from '@/types';

type Label = string;
type Icon = string;
type KeyType = keyof Apartment;

const visibleApartmentProperties: [KeyType, Label, Icon][] = [
    ['type', 'Type', 'dashboard'],
    ['exposure', 'Exposure', 'explore'],
    ['fullArea', 'Area, m²', 'square_foot'],
    ['balconyArea', 'Balcony, m²', 'balcony'],
    ['floorNumber', 'Floor', 'floor'],
    ['roomNumber', 'Rooms', 'bed'],
];

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

    const detailsUrl = {
        query: floorDetails ? { apartmentId } : { apartmentId, floorDetails },
    };

    return (
        <aside className="absolute right-4 top-4 z-10 w-64 rounded-md bg-base p-4 ">
            <div className="flex justify-between">
                <h1 className="text-2xl font-extrabold">
                    Apartment {apartmentInfo?.name ?? ''}
                </h1>
                <IconLink collapsed href="/search" icon="close"></IconLink>
            </div>
            <div>
                <hr className="my-2 border-zinc-200 dark:border-zinc-700" />
                <div className="flex flex-wrap">
                    {visibleApartmentProperties.map(([key, label, icon]) => {
                        return (
                            <div
                                key={key}
                                className="my-2 w-[33.333%] flex-col flex-wrap justify-between"
                            >
                                <div className="flex">
                                    <span className="material-symbols-outlined mr-1">
                                        {icon}
                                    </span>
                                    <span className="font-extrabold">
                                        {apartmentInfo?.[key]}
                                    </span>
                                </div>
                                <span className="text-xs text-typo-secondary">
                                    {label}
                                </span>
                            </div>
                        );
                    })}
                </div>
                <hr className="my-2 border-zinc-200 dark:border-zinc-700" />
                <IconLink
                    className="w-[50%]"
                    href={detailsUrl}
                    icon="grid_view"
                >
                    {floorDetails ? 'Back' : 'Key plan'}
                </IconLink>
                <IconLink
                    className="w-[50%]"
                    href={`/details/${apartmentId}`}
                    icon="vrpano"
                >
                    Explore
                </IconLink>
            </div>
        </aside>
    );
}
