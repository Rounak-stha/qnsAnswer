const express = require("express");

// initialize app/ server
const app = express();

// serving static files
app.use(express.static("frontend"));

const port = process.env.PORT || 3000;
// listen on port
app.listen(port, () => console.log("server started"));
