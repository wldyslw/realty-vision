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
