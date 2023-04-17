# Pixeldrain.js

A NodeJS wrapper for the pixeldrain.com API

## Installation
```bash
$ npm install pixeldrainjs
```

## Usage
```javascript
import { Pixeldrain } from 'pixeldrainjs'

let client = new PixelDrain("your-api-key")

//Upload a new file
let file = await client.uploadFile({
    path: "./cat.jpg",
    name: "this is a file I uploaded from pixeldrain.js",
    anonymous: false,
})

//You can delete and download the file
await file.download("./downloads")
await file.delete()

//You can also get information about a existing file as well
let someOtherFile = await client.getFile("o1k5QbTE")
console.log(someOtherFile.id) //o1k5QbTE
```
