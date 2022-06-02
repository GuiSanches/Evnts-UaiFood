import RestaurantMongoAdapter, {
  RestaurantSchema,
} from "../../adapter/Restaurant/mongoAdapter";
import Restaurant from "../../models/restaurant";
import RestaurantRepository, {
  RestaurantQuery,
} from "../../repositories/restaurant-repository";
import connectDB from "../utils/mongodb";

export default class RestaurantMongoABI implements RestaurantRepository {
  async createRestaurant(restaurant: Restaurant): Promise<boolean> {
    return new Promise((res, rej) => {
      connectDB("uaifood", async (db) => {
        try {
          await db.collection("restaurant").insertOne(restaurant);
          res(true);
        } catch (e: any) {
          res(false);
        }
      });
    });
  }

  async getRestaurant(restaurant: string): Promise<Restaurant | null> {
    return new Promise((res, rej) => {
      connectDB("uaifood", async (db) => {
        const value = await db.collection("restaurant").findOne({
          name: restaurant,
        });

        if (value)
          res(RestaurantMongoAdapter.convertToModel(value as RestaurantSchema));
        else res(null);
      });
    });
  }

  async listRestaurant(query: RestaurantQuery): Promise<Restaurant[] | null> {
    return new Promise((res, rej) => {
      connectDB("uaifood", async (db) => {
        const value = await db
          .collection("restaurant")
          .find()
          .toArray();

          if(value)
            res(value.map(v => RestaurantMongoAdapter.convertToModel(v as RestaurantSchema)));
        else res(null);
      });
    });
  }
}
