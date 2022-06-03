import express from "express";
import cors from "cors";
import RestaurantRouter from "./routers/restaurant-router";
import ItemRouter from "./routers/itens-router";
import { initializeDB } from "./data/utils/mongodb";
import { MongoClient, ServerApiVersion } from "mongodb";
require("dotenv").config();

const PORT = process.env.PORT || 7500;

const app = express();
const URI = process.env.MONGO_DB_LOCAL || "";

export const client = new MongoClient(URI, {
  serverApi: ServerApiVersion.v1,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Aceita um cafézin?");
});

app.use(cors());

// Routes
app.use("/restaurant", RestaurantRouter);
app.use("/item", ItemRouter);

app.use((req, res) => {
  res.status(404).send("Not found");
});

app.listen(PORT, async () => {
  await initializeDB();
  console.log(`Servidor rodando com sucesso ${PORT}`);
});

export default app;
