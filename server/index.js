"use strict";

require("dotenv").config();
const express = require("express");
const sequelize = require("./config/sequelize");
const cors = require("cors");

const app = express();
module.exports = app;
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use("/api", require("./routes/alimente"));
app.use("/api", require("./routes/utilizatori"));
app.use("/api", require("./routes/prietenii"));

app.set("port", process.env.PORT || 7000);

app.listen(app.get("port"), async () => {
  console.log("Server started on localhost:7000");
  try {
    await sequelize.authenticate();
    console.log("connection established");
  } catch (err) {
    console.error("Unable to connect", err);
  }
});
