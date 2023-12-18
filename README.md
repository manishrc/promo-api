## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Size Charts
### API

```
Format:  /api/[sanmar|alphabroder]/[itemId]
Example: /api/alphabroder/5180
```

### Example Response

```
{
  "supplier": "alphabroder",
  "itemId": "5180",
  "productName": "Hanes Unisex Beefy-T� T-Shirt",
  "unit": "inch",
  "measurements": ["body width", "full body length", "sleeve length"],
  "sizes": ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
  "sizeChart": {
    "Chest Width": {
      "S": 18,
      "M": 20,
      "L": 22,
      "XL": 24,
      "2XL": 26,
      "3XL": 28,
      "4XL": 30,
      "5XL": 32,
      "6XL": 36
    },
    "Body Length": {
      "S": 28,
      "M": 29,
      "L": 30,
      "XL": 31,
      "2XL": 33,
      "3XL": 34,
      "4XL": 35,
      "5XL": 36,
      "6XL": 37
    },
    "Sleeve Length": {
      "S": 8.13,
      "M": 8.38,
      "L": 8.63,
      "XL": 8.88,
      "2XL": 9.63,
      "3XL": 10.13,
      "4XL": 10.63,
      "5XL": 11.13,
      "6XL": 9.75
    }
  }
}
```
