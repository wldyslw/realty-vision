export enum PlaceTypes {
    Park = 'Park',
    Culture = 'Culture',
    Transport = 'Transport',
    Education = 'Education',
    Shopping = 'Shopping',
}

export type Place = {
    name: string;
    coords: [number, number];
    type: PlaceTypes;
};

export type Origin = Omit<Place, 'type'>;

export type MapInfo = {
    places: Place[];
    origin: Origin;
};
