import Head from 'next/head';
import { useRouter } from 'next/router';
import { memo, useCallback, useMemo, useRef, type ChangeEvent } from 'react';
import useTranslation from 'next-translate/useTranslation';

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
    const { t } = useTranslation('common');
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
                <title>{`${t('navigation.search')} | The Building`}</title>
            </Head>
            <Sheet ref={sheetRef} className="opacity-scale-appear lg:py-2">
                <div
                    id="filters"
                    className="z-10 mb-2 rounded-md bg-base px-2 lg:sticky lg:inset-0"
                >
                    <Filter icon="bed" label={t('search.bedrooms')}>
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
                    <Filter icon="explore" label={t('search.exposure')}>
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
                                    {t('search.directions.' + exposure)}
                                </ButtonGroup>
                            );
                        })}
                    </Filter>
                    <Filter icon="floor" label={t('search.floor_number')}>
                        <Slider
                            step={1}
                            min={1}
                            max={building?.floorsNumber ?? 100}
                            value={floorNumberFilter}
                            onChange={handleFloorRangeChange}
                        />
                    </Filter>
                </div>
                <div
                    id="data"
                    className="opacity-scale-appear mb-2 rounded-md bg-base p-2"
                >
                    <table className="w-full text-center">
                        <thead className="sticky inset-0 rounded-t-md bg-base text-typo-secondary lg:static">
                            <tr className="text-sm font-bold">
                                <td className="py-2">
                                    <span className="material-symbols-rounded text-2xl lg:hidden">
                                        tag
                                    </span>
                                    <span className="hidden lg:inline">
                                        {t('search.apartment_number')}
                                    </span>
                                </td>
                                <td className="py-2">
                                    <span className="material-symbols-rounded text-2xl lg:hidden">
                                        explore
                                    </span>
                                    <span className="hidden lg:inline">
                                        {t('search.exposure')}
                                    </span>
                                </td>
                                <td className="py-2">
                                    <span className="material-symbols-rounded text-2xl lg:hidden">
                                        floor
                                    </span>{' '}
                                    <span className="hidden lg:inline">
                                        {t('search.floor_number')}
                                    </span>
                                </td>
                                <td className="py-2">
                                    <span className="material-symbols-rounded text-2xl lg:hidden">
                                        bed
                                    </span>
                                    <span className="hidden lg:inline">
                                        {t('search.bedrooms')}
                                    </span>
                                </td>
                                <td className="py-2">
                                    <span className="material-symbols-rounded text-2xl lg:hidden">
                                        square_foot
                                    </span>
                                    <span className="hidden lg:inline">
                                        {t('search.area_m_2')}
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
                                        } border-b-[1px] border-divider/50 last:border-b-0 hover:cursor-pointer hover:bg-primary-hover active:bg-primary-active`}
                                        key={apt.id}
                                        onClick={handleApartmentSelect}
                                        role="link"
                                        data-href={`/search?apartmentId=${apt.id}`}
                                        data-id={apt.id}
                                    >
                                        <td className="py-2">{apt.name}</td>
                                        <td className="py-2">
                                            {apt.exposure
                                                .map((e) =>
                                                    t(`search.directions.${e}`)
                                                )
                                                .join(', ')}
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
