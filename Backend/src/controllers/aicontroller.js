const aiService = require("../Services/aiServices");

module.exports.getResume = async (req, res) => {
  const cleanedData = req.body.cleanedData;
  console.log("cleanedData", cleanedData);
  console.log("req.body", req.body);
  
  if (!cleanedData) {
    return res.status(400).send("User info required");
  }

  const response = await aiService(cleanedData);
  if (!response) {
    return res.status(500).send("Error generating resume");
  }
  console.log("response", response);
  res.send(response);
};
