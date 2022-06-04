import express from "express";
import RestaurantMongoAPI from "../data/restaurantRepository/restaurantMongoAPI";
import Restaurant from "../models/restaurant";
import RestaurantRepository, {
  RestaurantQuery,
} from "../repositories/restaurant-repository";

const restaurantRouter = express.Router();
const restaurantRepository: RestaurantRepository = new RestaurantMongoAPI();

restaurantRouter.post("/", async (req, res) => {
  const restaurant: Restaurant = req.body;

  const isCreated = await restaurantRepository.createRestaurant(restaurant);

  if (isCreated) res.status(200).send("Deu bom!");
  else res.status(404).send("Not found");
});

restaurantRouter.get("/:restaurant", async (req, res) => {
  const restaurant: string = req.params.restaurant;

  const data = await restaurantRepository.getRestaurant(restaurant);

  if (data) res.status(200).json(data);
  else res.status(404).send("Not found");
});

restaurantRouter.get("/", async (req, res) => {
  const query: RestaurantQuery = req.body;
  const data = await restaurantRepository.listRestaurant(query);

  if (data) res.status(200).json(data);
  else res.status(404).send("Not found");
});

export default restaurantRouter;
