import Restaurant from "../models/restaurant";

export interface RestaurantQuery {
    city?: string;
    segment?: string;
    plate?: string;
    distance?: {
        coord: [number, number],
        radius: number
    };
}

export default interface RestaurantRepository {
    createRestaurant(restaurant: Restaurant): Promise<boolean>;
    getRestaurant(restaurant: string): Promise<Restaurant | null>;
    listRestaurant(query: RestaurantQuery): Promise<Restaurant[] | null>;
}