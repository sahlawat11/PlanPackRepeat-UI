
export interface Itinerary {
    info: Info;
    destinations?: Array<Destinations> | null;
    budget?: number;
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

export interface BackendItinerary {
    itineraryName: string;
    startDate?: Date | string;
    endDate?: Date | string;
    email?: string;
    budgetId?: number;
    destinations?: (BackendDestination)[] | null;
    active?: boolean;
    public?: boolean;
}

export interface BackendDestination {
    destName?: string;
    address?: string;
    plannedTime?: Date | string;
    status?: string;
    imgUrl?: string;
    latitude: string | null;
    longitude: string | null;
    source: string;
}
  