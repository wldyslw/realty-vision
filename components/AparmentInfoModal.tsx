import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import IconLink from './IconLink';
import type { Apartment } from '@/types';
import useApartment from '@/utils/useApartment';
import { PersistedQueryStorageKey } from '@/utils/constants';
import ApartmentInfoDigest from './ApartmentInfoDigest';

type ApartmentInfoProps = {
    onClose?: () => void;
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

    useEffect(() => {
        localStorage.removeItem(PersistedQueryStorageKey);
    }, []);

    const persistQuery = useCallback(() => {
        localStorage.setItem(PersistedQueryStorageKey, router.asPath);
    }, [router.asPath]);

    return (
        <aside
            className={`${
                apartmentId
                    ? 'bottom-0 lg:right-4'
                    : '-bottom-full lg:-right-full'
            } bottom-sheet absolute z-[10000000000] w-full rounded-md rounded-t-3xl bg-base-darker p-3 drop-shadow transition-all lg:bottom-auto lg:top-4 lg:z-10 lg:w-80 lg:rounded-t-none `}
        >
            <div className="flex justify-between px-4 py-2">
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
            <ApartmentInfoDigest apartmentInfo={apartmentInfo} />
            <div className="mb-8 flex lg:mb-0">
                <IconLink className="mr-2" href={detailsUrl} icon="grid_view">
                    {floorDetails ? 'Back' : 'Key plan'}
                </IconLink>
                <IconLink
                    onClick={persistQuery}
                    href={`/details/${apartmentId}`}
                    icon="vrpano"
                >
                    Explore
                </IconLink>
            </div>
        </aside>
    );
}
