const express = require("express");
const adsRoutes = require("./routes/ads");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

// CSS va HTML fayllarini ishlatish
app.use(express.static("public"));

// E'lonlar API
app.use("/api/ads", adsRoutes);

app.get("/", (req, res) => {
  res.send("API ishlayapti!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB ga ulandi");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishlayapti`);
    });
  })
  .catch((error) => {
    console.log("MongoDB ulanish xatosi:", error.message);
  });