const express = require("express");
const { default: axios } = require("axios");
const { processSets } = require("./utils/methods");
const cors = require("cors");
const controllers = require('./controllers');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));

const attachGet = (path, router) => {
  app.get(path, router);
  app.get(`/_ssserver${path}`, router);
};

attachGet('/', controllers.indexRoute);
attachGet('/places', controllers.placesRoute);
attachGet('/place/:id', controllers.placeRoute);

app.listen(3000, () => console.log('Server running on 3000'));
