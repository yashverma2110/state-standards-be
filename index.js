const express = require("express");
const { default: axios } = require("axios");
const { processSets } = require("./utils/methods");

const app = express();

app.use(cors({ origin: "*" }));
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
