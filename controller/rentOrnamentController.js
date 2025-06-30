const RentOrnament = require("../model/rentOrnamentModel");

const findAll = async (req, res) => {
  try {
    const rentOrnament = await RentOrnament.find();
    res.status(200).json(rentOrnament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRent = async (req, res) => {
  try {
    const { title, price, description } = req.body;

    if (!title || !price || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const image =
      req.files && req.files["image"] ? req.files["image"][0].filename : null;

    const newRentOrnament = new RentOrnament({
      title,
      image,
      description,
      price,
    });

    await newRentOrnament.save();
    res.status(201).json(newRentOrnament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const ornament = await RentOrnament.findById(req.params.id);
    if (!ornament) {
      return res.status(404).json("Ornament not found");
    }
    res.status(200).json(ornament);
  } catch (e) {
    res.json(e);
  }
};

module.exports = {
  findById,
  findAll,
  createRent,
};
