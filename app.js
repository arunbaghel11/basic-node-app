const express = require("express");
const app = express();
const port = 3000; // Set to avoid 8080

app.get("/", (req, res) => {
  res.send("Hello World from Node.js!");
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

