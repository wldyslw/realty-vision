import { memo, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import IconLink from '@/components/IconLink';
import Sheet, { SheetRef } from '@/components/Sheet';
import ApartmentInfoDigest from '@/components/ApartmentInfoDigest';
import useApartment from '@/utils/useApartment';
import { PersistedQueryStorageKey } from '@/utils/constants';

const tours = [
    'https://grupityanaygrouptlv.com/black-1/Index.html',
    'https://grupityanaygrouptlv.com/white-1/Index.html',
    'https://grupityanaygrouptlv.com/black-8/Index.html',
    'https://grupityanaygrouptlv.com/white-8/index.html',
];

function Details() {
    const { t } = useTranslation('common');
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
            <Head>
                <title>
                    {`${t('general.apartment')} ${
                        apartmentInfo?.name
                    } | The Building`}
                </title>
            </Head>
            <Sheet ref={sheetRef} className="lg:w-96">
                <div className="flex py-4">
                    <IconLink
                        className="me-2"
                        onClick={sheetRef.current?.toggle}
                        href={backLink}
                        icon="arrow_back_ios_new"
                    ></IconLink>
                    <h2 className="text-2xl">
                        {t('general.apartment')} {apartmentInfo?.name ?? ''}
                    </h2>
                </div>
                <ApartmentInfoDigest apartmentInfo={apartmentInfo} />
                <div>
                    <IconLink icon="call" href="tel:123456789" className="me-2">
                        +1 234 567 890
                    </IconLink>
                    <IconLink icon="mail" href="mailto:user@example.com">
                        user@email.com
                    </IconLink>
                </div>
            </Sheet>
            <iframe
                src={tours[+apartmentId % 4]}
                className="h-full w-full"
            ></iframe>
        </>
    );
}

export default memo(Details);
