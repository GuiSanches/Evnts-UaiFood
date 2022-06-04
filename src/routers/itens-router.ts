import express from "express";
import ItemMongoAPI from "../data/itemRepository/itemMongoAPI";
import Item from "../models/Item";
import ItemRepository from "../repositories/item-repository";

const itemRouter = express.Router();
const itemRepository: ItemRepository = new ItemMongoAPI();

itemRouter.post("/:restaurant", async (req, res) => {
  const item: Item = req.body;
  const restaurant: string = req.params.restaurant;

  const isCreated = await itemRepository.createItem(restaurant, item);

  if (isCreated) res.status(200).send("Deu bom!");
  else res.status(404).send("Not found");
});

itemRouter.put("/:restaurant/:item", async (req, res) => {
  const item: Item = req.body;
  const restaurant: string = req.params.restaurant;
  const itemName: string = req.params.item;

  const isUpdated = await itemRepository.updateItem(
    {
      item: itemName,
      restaurant,
    },
    item
  );

  if (isUpdated) res.status(200).send("Deu bom!");
  else res.status(404).send("Not found");
});

export default itemRouter;
