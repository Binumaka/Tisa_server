const Rent = require("../model/rentModel");

const findAllrentORnament = async (req, res) => {
  try {
    const packages = await Rent.find().populate("RentOrnamentId");
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createRentOrnament = async (req, res) => {
  try {
    const { title, totalprice, description, RentOrnamentId } = req.body;

    if (!title || !totalprice || !description || !RentOrnamentId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const image =
      req.files && req.files["image"] ? req.files["image"][0].filename : null;

    const newRent = new Rent({
      title,
      image,
      description,
      RentOrnamentId,
      totalprice,
    });

    await newRent.save();
    res.status(201).json(newRent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const ornament = await Rent.findById(req.params.id).populate("RentOrnamentId");
    if (!ornament) {
      return res.status(404).json("Ornament not found");
    }
    res.status(200).json(ornament);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


module.exports = {
  findById,
  findAllrentORnament,
  createRentOrnament,
};
