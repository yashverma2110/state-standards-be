const express = require("express");
const { default: axios } = require("axios");
const { processSets } = require("./utils/methods");

const app = express();

app.use(function (req, res, next) {
  var allowedOrigins = [
    "http://localhost:3000",
    "https://state-standards.vercel.app/",
  ];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    res.header(
      "Access-Control-Allow-Origin",
      "https://state-standards.vercel.app//"
    );
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  } else {
    return next();
  }
});

app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  return res.send("Ready to be used");
});

app.get("/places", async (req, res) => {
  try {
    const response = await axios.get(
      "http://commonstandardsproject.com/api/v1/jurisdictions",
      {
        headers: {
          "Api-Key": "iJPumbsW28WUebdtJ7eizmvK",
        },
      }
    );

    return res.json({
      places: response.data.data,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
});

app.get("/place/:id", async (req, res) => {
  try {
    const { data } = await axios.get(
      `http://commonstandardsproject.com/api/v1/jurisdictions/${req.params.id}`,
      {
        headers: {
          "Api-Key": "iJPumbsW28WUebdtJ7eizmvK",
        },
      }
    );

    const sets = data.data.standardSets;
    const csv = await processSets(sets);

    return res.json({
      csv,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
});

app.listen(8080, () => console.log("Server running on 8080"));
