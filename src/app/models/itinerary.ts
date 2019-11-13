
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
    address1: string;
    address2?: string;
    date: string;
    time: string;
    status?: "travelled" | "wishlist"
}