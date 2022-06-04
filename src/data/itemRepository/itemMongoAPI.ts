import Item from "../../models/Item";
import ItemRepository, { ItemQuery } from "../../repositories/item-repository";
import connectDB from "../utils/mongodb";

export default class ItemMongoAPI implements ItemRepository {
  async createItem(restaurant: string, item: Item): Promise<boolean> {
    return new Promise(async (res, rej) => {
      try {
        await connectDB("uaifood", async (db) => {
          try {
            await db.collection("restaurant").updateOne(
              { name: restaurant },
              {
                $push: {
                  meals: item,
                },
              }
            );
            res(true);
          } catch (e: any) {
            console.error(e.message);
            res(false);
          }
        });
      } catch (e: any) {
        console.log(e.message);
        res(false);
      }
    });
  }

  updateItem(query: ItemQuery, newItem: Item): Promise<boolean> {
    return new Promise(async (res, rej) => {
      try {
        await connectDB("uaifood", async (db) => {
          try {
            await db.collection("restaurant").updateOne(
              {
                name: query.restaurant,
                "meals.name": query.item,
              },
              {
                $set: {
                  "meals.$": newItem,
                },
              }
            );
            res(true);
          } catch (e: any) {
            console.error(e.message);
            res(false);
          }
        });
      } catch (e: any) {
        console.log(e.message);
        res(false);
      }
    });
  }

  getItem(query: ItemQuery): Promise<Item | null> {
    return new Promise(async (res, rej) => {
      try {
        await connectDB("uaifood", async (db) => {
          try {
            const value = await db
              .collection("restaurant")
              .aggregate([
                {
                  $match: {
                    name: query.restaurant,
                  },
                },
                { $unwind: "$meals" },
                {
                  $match: {
                    "meals.name": query.item,
                  },
                },
                { $group: { _id: "$_id", meals: { $push: "$meals" } } },
                {
                  $limit: 1,
                },
              ])
              .next();

            if (value) res(value.meals as Item);
            else res(null);
          } catch (e: any) {
            console.error(e.message);
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
