import express from 'express';
import ItemMongoAPI from '../data/itemRepository/itemMongoAPI';
import Item from '../models/Item';
import ItemRepository from '../repositories/item-repository';

const itemRouter = express.Router();
const itemRepository: ItemRepository = new ItemMongoAPI();

itemRouter.post('/:restaurant', async (req, res) => {
    const item: Item = req.body;
    const restaurant : string = req.params.restaurant;
    
    const isCreated = await itemRepository.createItem(restaurant, item);

    if(isCreated)
        res.status(200).send('Deu bom!');
    else res.status(404);
});

itemRouter.put('/:restaurant/:item', async (req, res) => {
    const item: Item = req.body;
    const restaurant: string = req.params.restaurant;
    const itemName: string = req.params.item;
    
    const isUpdated = await itemRepository.updateItem({
        item: itemName,
        restaurant,
    }, item);

    if(isUpdated)
        res.status(200).send('Deu bom!');
    else res.status(404);
});

itemRouter.get('/:restaurant/:item', async (req, res) => {
    const restaurant: string = req.params.restaurant;
    const itemName: string = req.params.item;
    
    const data = await itemRepository.getItem({
        item: itemName,
        restaurant,
    });

    if(data)
        res.status(200).json(data);
    else 
        res.status(404);
});

export default itemRouter;