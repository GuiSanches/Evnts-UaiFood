# Busca restaurante - Query

Busca um restaurante dado: cidade, segmento, prato e distância.

**URL** : `/restaurant/`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

Request type
```
  city: sring
  segment: string
  plate: string
  distance: {
    coord: [number, number],
    radius: number
   }
```

Request Example
```json
  "city": "São Vicente",
  "segment": "Alimenticio"
  "distance": {
    "coord": [123, 314],
    "radius": 1
   }
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
