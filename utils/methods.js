const { default: axios } = require("axios");

const processSets = async (sets) => {
  const rows = [["SHORT_CODE", "TITLE", "GRADE", "SUBJECT", "DESCRIPTION"]];
  for (const set of sets) {
    const { data } = await axios.get(
      `http://commonstandardsproject.com/api/v1/standard_sets/${set.id}`
    );

    set.title = set.title?.replace(/,/g, "");
    set.description = set.description?.replace(/,/g, "");
    set.subject = set.subject?.replace(/,/g, "");

    Object.values(data.data.standards).forEach((standard) => {
      rows.push([
        standard.statementNotation ||
          standard.asnIdentifier ||
          standard.id ||
          "<short code not found>",
        set.title || set.description,
        set.educationLevels.join(" and "),
        set.subject,
        set.title ? standard.description || "" : "",
      ]);
    });
  }

  const csv = arrayToCsv(rows);

  return csv;
};

function arrayToCsv(data) {
  return data
    .map(
      (row) =>
        row
          .map(String) // convert every value to String
          .map((v) => v.replace(/"/g, '""')) // escape double colons
          .map((v) => `"${v}"`) // quote it
          .join(",") // comma-separated
    )
    .join("\r\n"); // rows starting on new lines
}

module.exports = {
  processSets,
};
