const express = require("express");
const quizData = require("./quizData");

// initialize app/ server
const app = express();

app.get("/", (req, res) => {
  res.send("welcome");
});

// port variable
const port = process.env.PORT || 5000;

app.get("/api/quiz", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*"); // enabling cors
  res.json(quizData);
});

// listen on port
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
