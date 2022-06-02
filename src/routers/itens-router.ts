import express from 'express';
import Item from '../models/Item';
import ItemRepository from '../repositories/item-repository';

const itemRouter = express.Router();
const itemRepository: ItemRepository;

itemRouter.post('/:restaurant', (req, res) => {
    const item: Item = req.body;
    const restaurant : string = req.params.restaurant;
    itemRepository.createItem(restaurant, item);

    res.status(200).send('Deu bom!');
});

itemRouter.put('/:restaurant/:item', (req, res) => {
    const item: Item = req.body;
    const restaurant: string = req.params.restaurant;
    const itemName: string = req.params.item;
    
    itemRepository.updateItem({
        item: itemName,
        restaurant,
    }, item);

    res.status(200).send('Deu bom!');
});

itemRouter.get('/:restaurant/:item', (req, res) => {
    const restaurant: string = req.params.restaurant;
    const itemName: string = req.params.item;
    
    itemRepository.getItem({
        item: itemName,
        restaurant,
    });
});

export default itemRouter;