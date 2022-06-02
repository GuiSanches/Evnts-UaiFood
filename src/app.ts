import express from 'express';
import cors from 'cors';
import RestaurantRouter from './routers/restaurant-router';
import ItemRouter from './routers/itens-router';
require('dotenv').config();

const PORT = process.env.PORT || 4000;

const HOSTNAME = process.env.HOSTNAME || 'http://localhost';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Aceita um cafézin?');
});

app.use(cors({
    origin: ['http://localhost: 3000']
}));

// Routes
app.use('/restaurant', RestaurantRouter);
app.use('/item', ItemRouter);

app.use((req, res) => {
    res.status(404);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`);
});