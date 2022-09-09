const indexRoute = (req, res) => {
  return res.send('Ready to be used');
};

const placesRoute = async (req, res) => {
  try {
    const response = await axios.get(
      'http://commonstandardsproject.com/api/v1/jurisdictions',
      {
        headers: {
          'Api-Key': 'iJPumbsW28WUebdtJ7eizmvK',
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
};

const placeRoute = async (req, res) => {
  try {
    const { data } = await axios.get(
      `http://commonstandardsproject.com/api/v1/jurisdictions/${req.params.id}`,
      {
        headers: {
          'Api-Key': 'iJPumbsW28WUebdtJ7eizmvK',
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
};

module.exports = {
  indexRoute,
  placesRoute,
  placeRoute,
};
