const express = require("express");
const Ad = require("../models/Ad");

const router = express.Router();

// E'lon qo'shish
router.post("/", async (req, res) => {
  try {
    const { title, description, price, category, location } = req.body;

    // Majburiy maydonlarni tekshirish
    if (!title || !description || price === undefined || !category || !location) {
      return res.status(400).json({
        message: "Barcha majburiy maydonlarni kiriting",
      });
    }

    const ad = await Ad.create({
      title,
      description,
      price,
      category,
      location,
    });

    res.status(201).json({
      message: "E'lon muvaffaqiyatli qo'shildi",
      ad,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
});

module.exports = router;