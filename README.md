# Evnts-UaiFood API

Abaixo está a documentação da API desenvolvida para o processo seletivo da Evnts, baseado em app de Delivery, a API permite operações de CRUD sobre uma base de dados de restaurante e seus pratos.

## Restaurantes

A seguir os endpoints para interagir com os estabelecimetos

* [Adicionar restaurante](examples/restaurant/add_restaurant.md) : `POST /restaurant/`
* [Buscar restaurante - Nome](examples/restaurant/search_restaurant_name.md) : `GET /restaurant/:name`
* [Buscar restaurante - Query](examples/restaurant/search_restaurant.md) : `GET /restaurant/`

## Pratos

A seguir os endpoints para interagir com os estabelecimetos

* [Adicionar prato](examples/item/add_meal.md) : `POST /item/:restaurant/`
* [Atualizar prato - Restaurante](examples/item/update_meal.md) : `PUT /item/:restaurant/:item`


## Rodando

Para rodar a aplicação é necessário ter o docker instalado e configurado
[Tutorial](https://docs.docker.com/compose/install/)

```
  docker-compose up --build
```
