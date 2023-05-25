import { useRouter } from 'next/router';

import IconLink from './IconLink';
import type { Apartment } from '@/types';
import useApartment from '@/utils/useApartment';

type Label = string;
type Icon = string;
type KeyType = keyof Apartment;

const visibleApartmentProperties: [KeyType, Label, Icon][] = [
    ['type', 'Type', 'dashboard'],
    ['exposure', 'Exposure', 'explore'],
    ['fullArea', 'Area, m²', 'square_foot'],
    ['balconyArea', 'Balcony, m²', 'balcony'],
    ['floorNumber', 'Floor', 'floor'],
    ['roomsNumber', 'Rooms', 'bed'],
];

type ApartmentInfoProps = {
    onClose: () => void;
};

/**
 * It is used in presentational purposes to have an info while ApartementInfo card discard animation going on
 */
let apartmentInfo: Apartment;

export default function ApartmentInfo(props: ApartmentInfoProps) {
    const router = useRouter();
    const apartmentId = router.query.apartmentId as string | undefined;
    const _apartmentInfo = useApartment(apartmentId ?? null);
    apartmentInfo = _apartmentInfo ?? apartmentInfo;

    const floorDetails = !!router.query.floorDetails;

    const { apartmentId: _1, floorDetails: _2, ...restParams } = router.query;

    const detailsUrl = {
        query: floorDetails
            ? { ...restParams, apartmentId }
            : { ...restParams, apartmentId, floorDetails: true },
    };

    return (
        <aside
            className={`${
                apartmentId
                    ? 'bottom-0 lg:right-4'
                    : '-bottom-full lg:-right-full'
            } bottom-sheet absolute z-[10000000000] w-full rounded-md bg-base-darker p-3 transition-all lg:bottom-auto lg:top-4 lg:z-10 lg:w-72 `}
        >
            <div className="flex justify-between rounded-md px-4 py-2">
                <h2 className="text-2xl font-bold">
                    Apartment {apartmentInfo?.name ?? ''}
                </h2>
                <IconLink
                    collapsed
                    onClick={props?.onClose}
                    href={{ pathname: '/search', query: restParams }}
                    icon="close"
                ></IconLink>
            </div>
            <div className="mb-2 rounded-md bg-base px-4 py-2">
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
                                    <span className="font-bold">
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
            </div>
            <div className="flex">
                <IconLink
                    type="filled"
                    className="mr-2 w-full"
                    href={detailsUrl}
                    icon="grid_view"
                >
                    {floorDetails ? 'Back' : 'Key plan'}
                </IconLink>
                <IconLink
                    type="filled"
                    className="w-full"
                    href={`/details/${apartmentId}`}
                    icon="vrpano"
                >
                    Explore
                </IconLink>
            </div>
        </aside>
    );
}
