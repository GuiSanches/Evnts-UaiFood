import chai from "chai";
import chaiHttp from "chai-http";

import ItemRepository from "../repositories/item-repository";
import ItemMongoAPI from "../data/itemRepository/itemMongoAPI";
import RestaurantRepository from "../repositories/restaurant-repository";
import connectDB from "../data/utils/mongodb";
import server from "../app";

import MOCK_RESTAURANT from "./mocks/Restaurant";
import MOCK_ITEM from "./mocks/item";
import RestaurantMongoAPI from "../data/restaurantRepository/restaurantMongoAPI";

const should = chai.should();
chai.use(chaiHttp);

const itemMongoAPI: ItemRepository = new ItemMongoAPI();
const restaurantMongoAPI: RestaurantRepository = new RestaurantMongoAPI();

const ENDPOINT = '/item';

describe(`Testando endpoint ${ENDPOINT}`, () => {
  beforeEach(() => {
    return new Promise<void>(async (resolve) => {
      await restaurantMongoAPI.createRestaurant(MOCK_RESTAURANT);
      await itemMongoAPI.createItem(MOCK_RESTAURANT.name, MOCK_ITEM);
      resolve();
    });
  });

  describe("/POST/:restaurant item", () => {
    it("Deve inserir um prato ao restaurante", (done) => {
      chai
        .request(server)
        .post(`${ENDPOINT}/${MOCK_RESTAURANT.name}`)
        .send(MOCK_ITEM)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

    describe("/PUT/:restaurant item", () => {
      it("Deve atualizar um prato dado o nome do restaurante", (done) => {
        const updated = MOCK_ITEM;
        updated.ingredients = 'rainbow';

        chai.request(server)
        .put(`${ENDPOINT}/${MOCK_RESTAURANT.name}/${MOCK_ITEM.name}`)
        .send(updated)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        })
      })
    });

  afterEach(() => {
    return new Promise<void>((resolve) => {
      connectDB("uaifood", async (db) => {
        await db
          .collection("restaurant")
          .deleteOne({ name: MOCK_RESTAURANT.name });
        resolve();
      });
    });
  });
});
