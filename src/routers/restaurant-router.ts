import express from 'express';
import RestaurantMongoABI from '../data/restaurantRepository/restaurantMongoAPI';
import Restaurant from '../models/restaurant';
import RestaurantRepository, { RestaurantQuery } from '../repositories/restaurant-repository';

const restaurantRouter = express.Router();
const restaurantRepository: RestaurantRepository = new RestaurantMongoABI();

restaurantRouter.post('/', async (req, res) => {
    const restaurant: Restaurant = req.body;

    const isCreated = await restaurantRepository.createRestaurant(restaurant);

    if(isCreated)
        res.status(200).send('Deu bom!');
    else res.status(404);
});

restaurantRouter.get('/:restaurant', async (req, res) => {
    const restaurant: string = req.params.restaurant;
    
    const data = await restaurantRepository.getRestaurant(restaurant);

    if(data)
        res.status(200).json(data);
    else
        res.status(404);
});

restaurantRouter.get('/', async (req, res) => {
    const query: RestaurantQuery = req.body.restaurant;
    
    const data = await restaurantRepository.listRestaurant(query);

    if(data)
        res.status(200).json(data);
    else
        res.status(404);
});

export default restaurantRouter;