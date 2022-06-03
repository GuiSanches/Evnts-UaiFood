import { WithId, Document } from "mongodb";
import RestaurantMongoAdapter, {
  RestaurantSchema,
} from "../../adapter/Restaurant/mongoAdapter";
import Restaurant from "../../models/restaurant";
import RestaurantRepository, {
  RestaurantQuery,
} from "../../repositories/restaurant-repository";
import connectDB from "../utils/mongodb";

export default class MongoAPI implements RestaurantRepository {
  async createRestaurant(restaurant: Restaurant): Promise<boolean> {
    return new Promise(async (res, rej) => {
      try {
        await connectDB("uaifood", async (db) => {
          try {
            const result = await db
              .collection("restaurant")
              .insertOne(restaurant);
            if (result.acknowledged) res(true);
            else res(false);
          } catch (e: any) {
            res(false);
          }
        });
      } catch (e: any) {
        console.log(e.message);
        res(false);
      }
    });
  }

  async getRestaurant(restaurant: string): Promise<Restaurant | null> {
    return new Promise(async (res, rej) => {
      try {
        await connectDB("uaifood", async (db) => {
          try {
            const value = await db.collection("restaurant").findOne({
              name: restaurant,
            });

            if (value)
              res(
                RestaurantMongoAdapter.convertToModel(value as RestaurantSchema)
              );
            else res(null);
          } catch (e: any) {
            console.error(e.message);
            res(null);
          }
        });
      } catch (e: any) {
        console.log(e.message);
      }
    });
  }

  async listRestaurant(query: RestaurantQuery): Promise<Restaurant[] | null> {
    return new Promise(async (res, rej) => {
      try {
        await connectDB("uaifood", async (db) => {
          try {
            const objQuery: Record<string, unknown> = {};

            const { distance, ...rest } = query;
            let prop: keyof typeof rest;
            for (prop in rest) {
              if (rest[prop]) objQuery[prop] = rest[prop];
            }

            if (distance)
              objQuery.location = {
                $geoWithin: {
                  $centerSphere: [distance.coord, distance.radius / 6378.15],
                },
              };

            const value = await db
              .collection("restaurant")
              .find(objQuery)
              .toArray();

            if (value)
              res(
                value.map((v) =>
                  RestaurantMongoAdapter.convertToModel(v as RestaurantSchema)
                )
              );
            else res(null);
          } catch (e: any) {
            console.log(e.message);
            res(null);
          }
        });
      } catch (e: any) {
        console.log(e.message);
        res(null);
      }
    });
  }
}
