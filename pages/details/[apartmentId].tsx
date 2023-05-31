import { memo, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';

import IconLink from '@/components/IconLink';
import Sheet, { SheetRef } from '@/components/Sheet';
import ApartmentInfoDigest from '@/components/ApartmentInfoDigest';
import useApartment from '@/utils/useApartment';
import { PersistedQueryStorageKey } from '@/utils/constants';

function Details() {
    const router = useRouter();
    const apartmentId = router.query.apartmentId as string;
    const apartmentInfo = useApartment(apartmentId);
    const sheetRef = useRef<SheetRef | null>(null);

    const backLink = useMemo(
        () =>
            (typeof window !== 'undefined' &&
                localStorage.getItem(PersistedQueryStorageKey)) ||
            '/search',
        []
    );

    return (
        <>
            <Sheet ref={sheetRef} className="lg:w-96">
                <div className="flex py-4">
                    <IconLink
                        collapsed
                        className="mr-2"
                        onClick={sheetRef.current?.toggle}
                        href={backLink}
                        icon="arrow_back_ios_new"
                    ></IconLink>
                    <h2 className="text-2xl font-bold">
                        Apartment {apartmentInfo?.name ?? ''}
                    </h2>
                </div>
                <ApartmentInfoDigest apartmentInfo={apartmentInfo} />
                <div>
                    <IconLink icon="call" href="tel:123456789" className="mr-2">
                        Call us
                    </IconLink>
                    <IconLink icon="mail" href="mailto:user@example.com">
                        Write us
                    </IconLink>
                </div>
            </Sheet>
            <iframe
                src="https://grupityanaygrouptlv.com/black-8/Index.html"
                className="h-full w-full"
            ></iframe>
        </>
    );
}

export default memo(Details);
