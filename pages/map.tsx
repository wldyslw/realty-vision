import Head from 'next/head';
import { useRef, memo, useEffect, useMemo, useCallback, useState } from 'react';
import { Map, Marker } from 'mapbox-gl';
import useSWR from 'swr';
import useTranslation from 'next-translate/useTranslation';

import Chip from '@/components/Chip';
import fetcher from '@/utils/fetcher';
import { darkModeObserver } from '@/utils/mediaMatchers';
import { PlaceTypes, type MapInfo } from '@/types/map';

import 'mapbox-gl/dist/mapbox-gl.css';

type PlaceTypeStyle = {
    icon: string;
    color: string;
};

const placeTypeStyles: Record<PlaceTypes, PlaceTypeStyle> = {
    [PlaceTypes.Park]: {
        icon: 'nature',
        color: 'rgb(var(--color-green) / 70)',
    },
    [PlaceTypes.Culture]: {
        icon: 'theater_comedy',
        color: 'rgb(var(--color-purple) / 70)',
    },
    [PlaceTypes.Transport]: {
        icon: 'directions_bus',
        color: 'rgb(var(--color-red) / 70)',
    },
    [PlaceTypes.Education]: {
        icon: 'school',
        color: 'rgb(var(--color-sky) / 70)',
    },
    [PlaceTypes.Shopping]: {
        icon: 'shopping_cart',
        color: 'rgb(var(--color-yellow) / 70)',
    },
};

const originMarkerEl =
    typeof window !== 'undefined'
        ? window.document.createElement('div')
        : undefined;
if (originMarkerEl !== undefined) {
    originMarkerEl.className = 'origin-marker';
    originMarkerEl.innerHTML = `
        <span class="material-symbols-rounded">
            home
        </span>
    `;
}

function MapPage() {
    const { t } = useTranslation('common');

    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<Map | null>(null);

    useEffect(() => {
        const observer = darkModeObserver((isDarkMode) => {
            mapRef.current?.setStyle(
                isDarkMode
                    ? process.env.NEXT_PUBLIC_MAPBOX_STYLES_DARK_URL
                    : process.env.NEXT_PUBLIC_MAPBOX_STYLES_LIGHT_URL
            );
        });
        observer.observe();
        return () => observer.disconnect();
    }, []);

    const { data } = useSWR<MapInfo>('/api/mapInfo', fetcher);

    const [selectedTypes, selectTypes] = useState(new Set<PlaceTypes>());

    const markers = useMemo(() => {
        if (data) {
            return data.places
                .filter(
                    (place) =>
                        selectedTypes.size === 0 ||
                        selectedTypes.has(place.type)
                )
                .map((place) => {
                    const marker = new Marker({
                        color: placeTypeStyles[place.type].color,
                    }).setLngLat(place.coords);
                    marker.getElement().dataset.label = place.name;
                    return marker;
                });
        }
        return null;
    }, [data, selectedTypes]);

    const originMarker = useMemo(() => {
        if (data) {
            return new Marker(originMarkerEl).setLngLat(data.origin.coords);
        }
        return null;
    }, [data]);

    const visibleTypes = useMemo(() => {
        if (data) {
            const types = new Set<PlaceTypes>();
            data.places.forEach((place) => types.add(place.type));
            return types;
        }
        return new Set<PlaceTypes>();
    }, [data]);

    useEffect(() => {
        if (containerRef.current) {
            mapRef.current = new Map({
                accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
                container: containerRef.current,
                style:
                    typeof window !== undefined &&
                    document.documentElement.classList.contains('dark')
                        ? process.env.NEXT_PUBLIC_MAPBOX_STYLES_DARK_URL
                        : process.env.NEXT_PUBLIC_MAPBOX_STYLES_LIGHT_URL,
                center: [-71.063097, 42.356206],
                zoom: 16,
                maxZoom: 18,
                minZoom: 14,
            });
        }
        return () => {
            mapRef.current?.remove();
        };
    }, []);

    useEffect(() => {
        markers?.forEach((m) => {
            if (mapRef.current) {
                m.addTo(mapRef.current);
            }
        });
        return () => {
            markers?.forEach((m) => m.remove());
        };
    }, [markers, originMarker]);

    useEffect(() => {
        if (mapRef.current) {
            originMarker?.addTo(mapRef.current);
        }
        return () => {
            originMarker?.remove();
        };
    }, [originMarker]);

    const handleFilterClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            const filterType = e.currentTarget.dataset.filterType as PlaceTypes;
            const newS = new Set<PlaceTypes>(selectedTypes);
            if (newS.delete(filterType)) {
                selectTypes(newS);
            } else {
                newS.add(filterType);
                selectTypes(newS);
            }
        },
        [selectedTypes]
    );

    const clearFilter = useCallback(() => {
        if (selectedTypes.size > 0) {
            selectTypes(new Set<PlaceTypes>());
        }
    }, [selectedTypes.size]);

    return (
        <>
            <Head>
                <title>{`${t('navigation.map')} | The Building`}</title>
            </Head>
            <div
                ref={containerRef}
                id="map"
                className="opacity-appear h-full w-full"
            ></div>
            <div className="opacity-scale-appear absolute inset-x-0 top-0 z-10 flex items-center overflow-x-auto px-4 py-2">
                <Chip
                    onClick={clearFilter}
                    className="inline-flex items-center"
                >
                    <span className="material-symbols-rounded">
                        location_on
                    </span>
                    <span className="ms-2">{t('map.All')}</span>
                </Chip>
                {Array.from(visibleTypes).map((type) => {
                    const { icon, color } = placeTypeStyles[type];
                    return (
                        <Chip
                            key={type}
                            active={selectedTypes.has(type)}
                            activeColor={color}
                            data-filter-type={type}
                            onClick={handleFilterClick}
                            className="inline-flex items-center"
                        >
                            <span className="material-symbols-rounded">
                                {icon}
                            </span>
                            <span className="ms-2">{t('map.' + type)}</span>
                        </Chip>
                    );
                })}
            </div>
        </>
    );
}

export default memo(MapPage);
