import { Apartment, Availability, Building, Complex, Exposure } from '../types';

const aptIds = [
    ['Flat001', 'Flat002', 'Flat003', 'Flat004'],
    ['Flat005', 'Flat006', 'Flat007', 'Flat008'],
    ['Flat009', 'Flat010', 'Flat011', 'Flat012'],
    ['Flat013', 'Flat014', 'Flat015', 'Flat016'],
    ['Flat017', 'Flat018', 'Flat019', 'Flat020'],
    ['Flat021', 'Flat022', 'Flat023', 'Flat024'],
    ['Flat025', 'Flat026', 'Flat027', 'Flat028'],
];

const exposures: Exposure[] = ['N', 'E', 'S', 'W'];

export const apartments = aptIds.reduce((acc, floor, floorNumber) => {
    const flats: Apartment[] = floor.map((id, index) => {
        return {
            id,
            name: id,
            type: '',
            floorNumber: floorNumber + 1,
            fullArea: 50,
            balconyArea: 5,
            exposure: [exposures[index]],
            availability: Availability.available,
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
