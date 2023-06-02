import { memo } from 'react';
import useTranslation from 'next-translate/useTranslation';

import type { Apartment } from '@/types';

type ApartementInfoDigestProps = {
    apartmentInfo: Apartment | null;
};

type Label = string;
type Icon = string;
type KeyType = keyof Apartment;

const visibleApartmentProperties: [KeyType, Label, Icon][] = [
    ['type', 'type', 'dashboard'],
    ['exposure', 'exposure', 'explore'],
    ['fullArea', 'area_m_2', 'square_foot'],
    ['balconyArea', 'balcony_area_m_2', 'balcony'],
    ['floorNumber', 'floor_number', 'floor'],
    ['roomsNumber', 'rooms_number', 'bed'],
];

function ApartementInfoDigest(props: ApartementInfoDigestProps) {
    const { t } = useTranslation('common');
    return (
        <div className="mb-2 flex flex-wrap rounded-md bg-base px-4 py-2">
            {visibleApartmentProperties.map(([key, label, icon]) => {
                return (
                    <div
                        key={key}
                        className="my-2 w-1/3 flex-col flex-wrap justify-between"
                    >
                        <div className="flex">
                            <span className="material-symbols-rounded">
                                {icon}
                            </span>
                            <span className="ms-1 font-bold">
                                {key === 'exposure'
                                    ? props.apartmentInfo?.exposure
                                          .map((e) =>
                                              t('search.directions.' + e)
                                          )
                                          .join(', ')
                                    : props.apartmentInfo?.[key]}
                            </span>
                        </div>
                        <span className="text-xs text-typo-secondary">
                            {t(`search.${label}`)}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

export default memo(ApartementInfoDigest);
