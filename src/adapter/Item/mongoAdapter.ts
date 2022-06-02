import { WithId, Document } from "mongodb";
import Item from "../../models/Item";

export type MealSchema = Item & Document

abstract class MealMongoAdapter {
  public static convertToModel(document: MealSchema): Item {
    const { name, price, ingredients, imageUrl, tags } = document;
    const meal: Item = {
        name,
        price,
        ingredients,
        imageUrl,
        tags
    }

    return meal;
  }
}

export default MealMongoAdapter;
