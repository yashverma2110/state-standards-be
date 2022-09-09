const express = require('express');
const cors = require('cors');
const controllers = require('./controllers');

const app = express();
const PORT = 3000;

var corsOptionsDelegate = function (req, callback) {
  callback(null, { origin: true }); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.use(express.json({ limit: '10mb' }));

const attachGet = (path, router) => {
  app.get(path, router);
  app.get(`/_ssserver${path}`, router);
};

attachGet('/', controllers.indexRoute);
attachGet('/places', controllers.placesRoute);
attachGet('/place/:id', controllers.placeRoute);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
