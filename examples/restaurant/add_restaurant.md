# Adiciona restaurante

Recebe um JSON de um restaurante e insere se não houver restaurante com mesmo nome.

**URL** : `/restaurant/`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`


Body type
```
  name: string
  city: sring
  segment: string
  stars: number
  address: string
  tags: string[]
  meals: Item[]
  location: [number, number]  
```

**Exemplo** Todos os campos devem ser preenchidos.
```json
{
    "name": "Pedrinho",
    "city": "São Vicente",
    "segment": "Alimentício",
    "stars": 5,
    "address": "Rua 5",
    "tags": ["parceiro"],
    "meals": [],
    location: [123, 314]
```

## Erros previstos

**Condição** : Estabelecimento já existente

**Code** : `404`
```
