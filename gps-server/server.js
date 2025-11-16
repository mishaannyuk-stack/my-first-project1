const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const https = require("https");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let lastGPS = { lat: 0, lon: 0 };
let polygons = [];

// STM32 надсилає координати
app.post("/api/gps", (req, res) => {
  lastGPS = req.body;
  console.log("GPS:", lastGPS);
  res.json({ status: "ok" });
});

// Страница повертає координату
app.get("/api/gps", (req, res) => {
  res.json(lastGPS);
});

// Збереження геозон з веба
app.post("/api/polygons", (req, res) => {
  polygons = req.body;
  console.log("New polygons:", polygons);
  res.json({ status: "saved" });
});

// STM32 забирає геозони
app.get("/api/polygons", (req, res) => {
  res.json(polygons);
});

const PORT = 3000;

app.listen(PORT, () => console.log("HTTP Server running on port", PORT));
