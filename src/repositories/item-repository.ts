import Item from "../models/Item";

export interface ItemQuery {
    restaurant: string;
    item: string;
}

export default interface ItemRepository {
    createItem(restaurant: string, item: Item): Promise<boolean>;
    updateItem(query: ItemQuery, newItem: Item): Promise<boolean>;
    getItem(query: ItemQuery): Promise<Item | null>;
}