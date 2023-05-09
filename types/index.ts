export type Exposure = 'N' | 'E' | 'S' | 'W';
export enum Availability {
    sold = 0,
    available = 1,
}
export type Apartment = {
    id: string;
    name: string;
    type: string;
    floorNumber: number;
    fullArea: number;
    balconyArea: number;
    exposure: Exposure[];
    availability: Availability;
};
export type Building = {
    id: string;
    name: string;
    floorsNumber: number;
    apartments: Apartment[];
};
export type Complex = {
    name: string;
    buildings: Building[];
};
