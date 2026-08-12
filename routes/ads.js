const express = require("express");
const Ad = require("../models/Ad");
const auth = require("../middlewares/auth");

const router = express.Router();

// ============================
// POST - yangi e'lon qo'shish
// ============================
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, price, category, location } = req.body;

    if (
      !title ||
      !description ||
      price === undefined ||
      !category ||
      !location
    ) {
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
      ownerId: req.user.id,
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

// ============================
// PUT - e'lonni o'zgartirish
// ============================
router.put("/:id", auth, async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({
        message: "E'lon topilmadi",
      });
    }

    if (ad.ownerId !== req.user.id) {
      return res.status(403).json({
        message: "Bu e'lonni o'zgartirishga ruxsatingiz yo'q",
      });
    }

    const updatedAd = await Ad.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "E'lon muvaffaqiyatli o'zgartirildi",
      ad: updatedAd,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
});

// ============================
// DELETE - e'lonni o'chirish
// ============================
router.delete("/:id", auth, async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({
        message: "E'lon topilmadi",
      });
    }

    if (ad.ownerId !== req.user.id) {
      return res.status(403).json({
        message: "Bu e'lonni o'chirishga ruxsatingiz yo'q",
      });
    }

    await Ad.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "E'lon muvaffaqiyatli o'chirildi",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
});

module.exports = router;