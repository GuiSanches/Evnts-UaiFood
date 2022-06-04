# Adiciona restaurante

Recebe um JSON de um prato e insere no estabelecimento.

**URL** : `/item/`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

Body type
```
  name: string
  price: number
  ingredients: string
  imageUrl: string
  tags: string[]
```

**Exemplo** Todos os campos devem ser preenchidos.
```json
{
    "name": "Pedrinho",
    "price": 47.0,
    ingredients: "Açúcar, tempero, e tudo o que há de bom (ou, na nova versão, tudo de maneiro).",
    "imageUrl": "https://pbs.twimg.com/media/EUX9kfHX0AQdBTk.jpg",
    "tags": ["japones", "brasileiro"],
```

## Success Response

**Code** : `200 OK`
**Message**: `Deu bom`
