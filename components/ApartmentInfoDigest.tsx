import type { Apartment } from '@/types';
import { memo } from 'react';

type ApartementInfoDigestProps = {
    apartmentInfo: Apartment | null;
};

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

function ApartementInfoDigest(props: ApartementInfoDigestProps) {
    return (
        <div className="mb-2 flex flex-wrap rounded-md bg-base px-4 py-2">
            {visibleApartmentProperties.map(([key, label, icon]) => {
                return (
                    <div
                        key={key}
                        className="my-2 w-1/3 flex-col flex-wrap justify-between"
                    >
                        <div className="flex">
                            <span className="material-symbols-rounded mr-1">
                                {icon}
                            </span>
                            <span className="font-bold">
                                {props.apartmentInfo?.[key]}
                            </span>
                        </div>
                        <span className="text-xs text-typo-secondary">
                            {label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

export default memo(ApartementInfoDigest);
