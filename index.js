const express = require('express');
const controllers = require('./controllers');

const app = express();
const PORT = 3000;

app.use(function (req, res, next) {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  } else {
    return next();
  }
});

app.use(express.json({ limit: '10mb' }));

const attachGet = (path, router) => {
  app.get(path, router);
  app.get(`/_ssserver${path}`, router);
};

attachGet('/', controllers.indexRoute);
attachGet('/places', controllers.placesRoute);
attachGet('/place/:id', controllers.placeRoute);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
