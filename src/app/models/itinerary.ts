
export interface Itinerary {
    info: Info;
    destinations?: Array<Destinations> | null;
}

export interface Info {
    name: string;
    startDate: string;
    endDate: string;
    visiblity: string
}

export interface Destinations {
    name: string;
    streetAddress: string;
    latitude: number | null;
    longitude: number | null;
    date: string;
    time: string;
    status?: "travelled" | "wishlist";
    source?: "maps" | "manual"
}