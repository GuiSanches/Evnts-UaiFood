import Item from "../models/Item";

interface ItemQuery {
    restaurant: string;
    item: string;
}

export default interface ItemRepository {
    createItem(restaurant: string, item: Item): Promise<void>;
    updateItem(query: ItemQuery, newItem: Item): Promise<void>;
    getItem(query: ItemQuery): Promise<void>;
}