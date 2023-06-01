import { MapInfo, Place, PlaceTypes } from '@/types/map';
import { Apartment, Availability, Building, Complex, Exposure } from '../types';

const aptIds = Array.from({ length: 7 }).map((_, floorIndex) => {
    return Array.from({ length: 4 }).map((_, aptIndex) => {
        return (floorIndex * 4 + aptIndex + 1).toString().padStart(3, '0');
    });
});

const exposures: Exposure[][] = [
    ['N', 'W'],
    ['S', 'W'],
    ['S', 'E'],
    ['N', 'E'],
];

const types = ['1A', '1B', '1C', '1D'];

export const apartments = aptIds.reduce((acc, floor, floorNumber) => {
    const flats: Apartment[] = floor.map((id, index) => {
        return {
            id,
            name: id,
            type: types[index],
            floorNumber: floorNumber + 1,
            fullArea: Math.round(Math.random() * 120 + 30),
            balconyArea: Math.round(Math.random() * 10 + 5),
            exposure: exposures[index],
            availability:
                Math.random() > 0.2
                    ? Availability.Available
                    : Availability.Sold,
            roomsNumber: Math.round(Math.random() * 3 + 1),
        } as Apartment;
    });
    return [...acc, ...flats];
}, [] as Apartment[]);

export const building: Building = {
    id: 'test_tower',
    name: 'Test Tower',
    floorsNumber: 7,
    apartments: apartments,
};

export const complex: Complex = {
    name: 'Test Complex',
    buildings: [building],
};

const places: Place[] = [
    {
        name: 'Church',
        coords: [-71.0623494384355, 42.35579772676142],
        type: PlaceTypes.Culture,
    },
    {
        name: 'State Library',
        coords: [-71.06374920452704, 42.35831012784041],
        type: PlaceTypes.Culture,
    },
    {
        name: 'Metro Station 01',
        coords: [-71.06236525596752, 42.356334134097665],
        type: PlaceTypes.Transport,
    },
    {
        name: 'Metro Station 02',
        coords: [-71.06469634759789, 42.35256794409563],
        type: PlaceTypes.Transport,
    },
    {
        name: 'Bus Station',
        coords: [-71.06577601680956, 42.356929222674154],
        type: PlaceTypes.Transport,
    },
    {
        name: 'Public Park',
        coords: [-71.06560561847631, 42.35610755156907],
        type: PlaceTypes.Park,
    },
    {
        name: 'Public School',
        coords: [-71.06345755971847, 42.35445557310731],
        type: PlaceTypes.Education,
    },
];

export const mapInfo: MapInfo = {
    places,
    origin: {
        name: 'The Building',
        coords: [-71.063097, 42.356206],
    },
};
