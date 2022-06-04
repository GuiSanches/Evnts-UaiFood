import { WithId, Document } from "mongodb";
import Restaurant from "../../models/restaurant";

export type RestaurantSchema = Restaurant & WithId<Document>

abstract class RestaurantMongoAdapter {
  public static convertToModel(document: RestaurantSchema): Restaurant {
    const { name, city, segment, stars, address, tags, meals, location } = document;
    const restaurant: Restaurant = {
      name,
      city,
      segment,
      stars,
      address,
      tags,
      meals,
      location
    };

    return restaurant;
  }
}

export default RestaurantMongoAdapter;
