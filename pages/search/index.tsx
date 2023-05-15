import ApartmentInfo from '@/components/AparmentInfoModal';
import { Availability } from '@/types';
import { ComplexInfoContext } from '@/utils/globalContext';
import { useRouter } from 'next/router';
import { useCallback, useContext } from 'react';

export default function Search() {
    const router = useRouter();
    const { data } = useContext(ComplexInfoContext);

    const handleApartmentSelect = useCallback(
        (e: React.PointerEvent<HTMLTableRowElement>) => {
            const id = e.currentTarget.dataset.id as string;
            router.push({ query: { ...router.query, apartmentId: id } });
        },
        [router]
    );

    return (
        <>
            <div className="max-h-48 w-full max-w-full shrink-0 overflow-scroll p-3 dark:bg-gray-900 lg:h-full lg:max-h-full lg:w-128">
                <div id="filters"></div>
                <div id="data">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Availability</td>
                                <td>Floor</td>
                                <td>Area</td>
                                <td>Exposure</td>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.buildings[0].apartments?.map((apt) => {
                                return (
                                    <tr
                                        className="hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                                        key={apt.id}
                                        onClick={handleApartmentSelect}
                                        role="link"
                                        data-href={`/search?apartmentId=${apt.id}`}
                                        data-id={apt.id}
                                    >
                                        <td>{apt.name}</td>
                                        <td>
                                            {apt.availability ===
                                            Availability.Available
                                                ? 'Available'
                                                : 'Sold'}
                                        </td>
                                        <td>{apt.floorNumber}</td>
                                        <td>{apt.fullArea}</td>
                                        <td>{apt.exposure.join(', ')}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {router.query.apartmentId ? <ApartmentInfo /> : null}
        </>
    );
}
