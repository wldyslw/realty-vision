import Head from 'next/head';
import { useRouter } from 'next/router';
import { memo, useCallback, useMemo, useRef, type ChangeEvent } from 'react';

import ApartmentInfo from '@/components/AparmentInfoModal';
import { type Exposure } from '@/types';
import useFilteredApartments from '@/utils/useFilteredApartment';
import useBuilding from '@/utils/useBuilding';
import { Filter } from '@/components/Filter';
import Slider from '@/components/Slider';
import ButtonGroup from '@/components/ButtonGroup';
import Sheet, { type SheetRef } from '@/components/Sheet';

const ExposuresArray: Exposure[] = ['N', 'W', 'S', 'E'];

function Search() {
    const router = useRouter();
    const building = useBuilding('test_tower');
    const { filteredApartments } = useFilteredApartments(building?.apartments);
    const sheetRef = useRef<SheetRef | null>(null);

    const roomsNumberRangeHelper = useMemo(() => {
        const roomsNumber = building?.apartments.map((apt) => apt.roomsNumber);
        if (roomsNumber) {
            const min = Math.min(...roomsNumber);
            const max = Math.max(...roomsNumber);
            return Array.from({ length: max - min + 1 }).map((_, i) =>
                (min + i).toString()
            );
        }
        return [];
    }, [building?.apartments]);

    const handleApartmentSelect = useCallback(
        (e: React.PointerEvent<HTMLTableRowElement>) => {
            const id = e.currentTarget.dataset.id as string;
            router.push({ query: { ...router.query, apartmentId: id } });
            sheetRef.current?.storeScroll();
        },
        [router]
    );

    const exposureFilter = useMemo(
        () => new Set(router.query.exposureFilter),
        [router.query.exposureFilter]
    );
    const roomsNumberFilter = useMemo(
        () => new Set(router.query.roomsNumberFilter),
        [router.query.roomsNumberFilter]
    );
    const floorNumberFilter = useMemo(() => {
        const value = router.query.floorNumberFilter as string[] | undefined;
        return value?.map((e) => +e) ?? [1, building?.floorsNumber ?? 2];
    }, [building?.floorsNumber, router.query.floorNumberFilter]);

    const handleFloorRangeChange = useCallback(
        (event: Event, val: number | number[]) => {
            const [min, max] = val as [number, number];
            router.push({
                query: {
                    ...router.query,
                    floorNumberFilter:
                        min === 1 && max === building?.floorsNumber
                            ? []
                            : (val as [number, number]),
                },
            });
        },
        [building?.floorsNumber, router]
    );

    const handleRoomsNumberFilterChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { id } = e.target;
            if (e.target.checked) {
                roomsNumberFilter.add(id);
            } else {
                roomsNumberFilter.delete(id);
            }
            router.push({
                query: {
                    ...router.query,
                    roomsNumberFilter: Array.from(roomsNumberFilter),
                },
            });
        },
        [roomsNumberFilter, router]
    );

    const handleExposureFilterChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { id } = e.target;
            if (e.target.checked) {
                exposureFilter.add(id);
            } else {
                exposureFilter.delete(id);
            }
            router.push({
                query: {
                    ...router.query,
                    exposureFilter: Array.from(exposureFilter),
                },
            });
        },
        [exposureFilter, router]
    );

    return (
        <>
            <Head>
                <title>Search | The Building</title>
            </Head>
            <Sheet ref={sheetRef}>
                <div
                    id="filters"
                    className="z-10 py-2 lg:sticky lg:inset-0 lg:bg-base-darker"
                >
                    <Filter icon="bed" label="Bedrooms">
                        {roomsNumberRangeHelper.map((roomsNumber) => {
                            const checked = roomsNumberFilter.has(roomsNumber);
                            return (
                                <ButtonGroup
                                    key={roomsNumber}
                                    id={roomsNumber.toString()}
                                    name="roomsNumber"
                                    onChange={handleRoomsNumberFilterChange}
                                    checked={checked}
                                >
                                    {roomsNumber}
                                </ButtonGroup>
                            );
                        })}
                    </Filter>
                    <Filter icon="explore" label="Exposure">
                        {ExposuresArray.map((exposure) => {
                            const checked = exposureFilter.has(exposure);
                            return (
                                <ButtonGroup
                                    key={exposure}
                                    id={exposure}
                                    name="exposure"
                                    onChange={handleExposureFilterChange}
                                    checked={checked}
                                >
                                    {exposure}
                                </ButtonGroup>
                            );
                        })}
                    </Filter>
                    <Filter icon="floor" label="Floor">
                        <Slider
                            step={1}
                            min={1}
                            max={building?.floorsNumber ?? 100}
                            value={floorNumberFilter}
                            onChange={handleFloorRangeChange}
                        />
                    </Filter>
                </div>
                <div id="data" className="mb-2 rounded-md bg-base p-2">
                    <table className="w-full text-center">
                        <thead className="sticky inset-0 rounded-t-md bg-base text-typo-secondary lg:top-48">
                            <tr className="text-sm font-bold">
                                <td className="py-2">
                                    <span className="material-symbols-rounded mr-2 text-2xl lg:hidden">
                                        tag
                                    </span>
                                    <span className="hidden lg:inline">
                                        Number
                                    </span>
                                </td>
                                <td className="py-2">
                                    <span className="material-symbols-rounded mr-2 text-2xl lg:hidden">
                                        explore
                                    </span>
                                    <span className="hidden lg:inline">
                                        Exposure
                                    </span>
                                </td>
                                <td className="py-2">
                                    <span className="material-symbols-rounded mr-2 text-2xl lg:hidden">
                                        floor
                                    </span>{' '}
                                    <span className="hidden lg:inline">
                                        Floor
                                    </span>
                                </td>
                                <td className="py-2">
                                    <span className="material-symbols-rounded mr-2 text-2xl lg:hidden">
                                        bed
                                    </span>
                                    <span className="hidden lg:inline">
                                        Bedrooms
                                    </span>
                                </td>
                                <td className="py-2">
                                    <span className="material-symbols-rounded mr-2 text-2xl lg:hidden">
                                        square_foot
                                    </span>
                                    <span className="hidden lg:inline">
                                        Area, m²
                                    </span>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApartments?.map((apt) => {
                                return (
                                    <tr
                                        className={`${
                                            router.query.apartmentId === apt.id
                                                ? 'bg-primary-focus'
                                                : ''
                                        } border-b-[1px] border-divider last:border-b-0 hover:cursor-pointer hover:bg-primary-hover active:bg-primary-active`}
                                        key={apt.id}
                                        onClick={handleApartmentSelect}
                                        role="link"
                                        data-href={`/search?apartmentId=${apt.id}`}
                                        data-id={apt.id}
                                    >
                                        <td className="py-2">{apt.name}</td>
                                        <td className="py-2">
                                            {apt.exposure.join(', ')}
                                        </td>
                                        <td className="py-2">
                                            {apt.floorNumber}
                                        </td>
                                        <td className="py-2">
                                            {apt.roomsNumber}
                                        </td>
                                        <td className="py-2">{apt.fullArea}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Sheet>
            <ApartmentInfo onClose={sheetRef.current?.restoreScroll} />
        </>
    );
}

export default memo(Search);
