const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
app.use(cors({ origin: "*" }));

const fileRoutes = require("./image-upload");
app.use(bodyParser.json());

app.get("/",(req,res) => {
  res.send(`Working at ${PORT}`)
})

app.use("/api/", fileRoutes);

const PORT = process.env.PORT || "3000";
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
