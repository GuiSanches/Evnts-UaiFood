# Busca restaurante - Nome

Recebe um restaurante via URL e retorna se existir.

**URL** : `/restaurant/:name`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

Response type
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

## Success Response

**Code** : `200 OK`

**payload**: 
```json
{
    "name": "Pedrinho",
    "city": "São Vicente",
    "segment": "Alimentício",
    "stars": 5,
    "address": "Rua 5",
    "tags": ["parceiro"],
    "meals": [],
    "location": [123, 314]
}
```

## Erros previstos

**Condição** : Estabelecimento não encontrado

**Code** : `404`
