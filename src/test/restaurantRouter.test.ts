import chai from "chai";
import chaiHttp from "chai-http";

import RestaurantMongoAPI from "../data/restaurantRepository/restaurantMongoAPI";
import connectDB from "../data/utils/mongodb";
import RestaurantRepository, {
  RestaurantQuery,
} from "../repositories/restaurant-repository";
import server from "../app";
import MOCK_RESTAURANT from "./mocks/Restaurant";

const should = chai.should();
chai.use(chaiHttp);

const restaurantMongoAPI: RestaurantRepository = new RestaurantMongoAPI();

const ENDPOINT = '/restaurant';

describe(`Testando endpoint ${ENDPOINT}`, () => {
  describe("/POST/ restaurant", () => {
    it("Deve inserir um restaurante na base de dados", () => {
      return new Promise<void>(async (resolve) => {
        chai
          .request(server)
          .post(ENDPOINT)
          .send(MOCK_RESTAURANT)
          .end((err, res) => {
            res.should.have.status(200);
          });

        // Delete after test
        await connectDB("uaifood", async (db) => {
          await db
            .collection("restaurant")
            .deleteOne({ name: MOCK_RESTAURANT.name });
          resolve();
        });
      });
    });
  });

  describe("/GET/:restaurant restaurant", () => {
    it("Deve buscar um restaurante dado o nome", () => {
      return new Promise<void>(async (resolve) => {
        // Create for testing
        await restaurantMongoAPI.createRestaurant(MOCK_RESTAURANT);

        chai
          .request(server)
          .get(`${ENDPOINT}/${MOCK_RESTAURANT.name}`)
          .end((err, res) => {
            res.should.have.status(200);
          });

        // Delete after test
        await connectDB("uaifood", async (db) => {
          await db
            .collection("restaurant")
            .deleteOne({ name: MOCK_RESTAURANT.name });
          resolve();
        });
      });
    });
  });

  describe("/GET/ restaurant", () => {
    it("Deve buscar um restaurante dado o nome", () => {
      return new Promise<void>(async (resolve) => {
        const QUERY: RestaurantQuery = {
          city: "São Carlos",
          segment: "",
          plate: "arroz",
          distance: "",
        };

        await restaurantMongoAPI.createRestaurant(MOCK_RESTAURANT);
        await restaurantMongoAPI.createRestaurant({
          ...MOCK_RESTAURANT,
          name: "Second",
        });

        chai
          .request(server)
          .get(ENDPOINT)
          .send(QUERY)
          .end((err, res) => {
            res.should.have.status(200);
            resolve();
          });
      });
    });
  });
});
