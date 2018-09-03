# Place API

Backend API for my Place application - inspired from [r/place](https://www.reddit.com/r/place/)

Front end here: https://github.com/doguh/place-client

See it in action here: https://place.hugod.fr

## How to use

```
npm install
npm run start:dev
```

## Environment variables

| Name                 | Description                                            | Default     |
| -------------------- | ------------------------------------------------------ | ----------- |
| CANVAS_HEIGHT        | Height of the canvas                                   | 256         |
| CANVAS_SAVE_FILE     | Path to the file were should be stored the canvas data | canvas.buff |
| CANVAS_SAVE_THROTTLE | Save canvas at most once per every x milliseconds      | 5000        |
| CANVAS_WIDTH         | Width of the canvas                                    | 256         |
| PORT                 | Port used by the server                                | 9000        |
