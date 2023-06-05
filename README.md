# Realty Vision, real property visualization software for Web

## Getting started

Start development with following steps:

1. Download `pnpm`
2. Populate `.env.local` file in root directory with the following environment variables:

```sh
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="your_token"
NEXT_PUBLIC_MAPBOX_STYLES_DARK_URL="mapbox://styles/mapbox/dark-v11"
NEXT_PUBLIC_MAPBOX_STYLES_LIGHT_URL="mapbox://styles/mapbox/light-v11"
NEXT_PUBLIC_TILESET_URL="/path/to/tileset.json"
```

3. Run:

```sh
pnpm install
pnpm dev # see localhost:3000
```

## Credits

© Uladzislau Maltsau <<wldyslw@outlook.com>>
