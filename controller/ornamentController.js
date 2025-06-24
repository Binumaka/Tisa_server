const Ornament = require("../model/ornamentsModel");

// Get all ornaments
const findAll = async (req, res) => {
  try {
    const ornaments = await Ornament.find();
    res.status(200).json(ornaments);
  } catch (e) {
    res.json(e);
  }
};

//Save ornaments
const save = async (req, res) => {
  try {
    const { title, price, rating, weight, length, category, tags, description, available,  section } = req.body;

    if (!title || !price || !category || !tags || !description || !available || !section) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Handle images if uploaded
    const image = req.files ? req.files['image'] ? req.files['image'][0].filename : null : null;
    const image1 = req.files ? req.files['image1'] ? req.files['image1'][0].filename : null : null;
    const image2 = req.files ? req.files['image2'] ? req.files['image2'][0].filename : null : null;

    const ornaments = new Ornament({
      category,
      title,
      description,
      price,
      tags,
      section,
      rating,
      weight,
      length,
      available,
      image,
      image1,
      image2,
    });

    await ornaments.save();
    res.status(201).json(ornaments);
  } catch (error) {
    console.error("Error creating ornaments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific ornament by ID
const findById = async (req, res) => {
  try {
    const ornament = await Ornament.findById(req.params.id);
    if (!ornament) {
      return res.status(404).json("Ornament not found");
    }
    res.status(200).json(ornament);
  } catch (e) {
    res.json(e);
  }
};

// Delete a specific ornament by ID
const deleteById = async (req, res) => {
  try {
    const ornament = await Ornament.findByIdAndDelete(req.params.id);
    if (!ornament) {
      return res.status(404).json("Ornament not found");
    }
    res.status(200).json("Ornament deleted");
  } catch (e) {
    res.json(e);
  }
};

// Update a specific ornament by ID
const update = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the existing ornament
    const existingOrnament = await Ornament.findById(id);
    if (!existingOrnament) {
      return res.status(404).json({ message: "Ornament not found" });
    }

    const updatedData = { ...req.body };

    // Handle new images if uploaded
    if (req.files) {
      updatedData.image = req.files['image'] ? req.files['image'][0].filename : existingOrnament.image;
      updatedData.image1 = req.files['image1'] ? req.files['image1'][0].filename : existingOrnament.image1;
      updatedData.image2 = req.files['image2'] ? req.files['image2'][0].filename : existingOrnament.image2;
    }

    // Update the destination document
    const updatedOrnament = await Ornament.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json({ message: "Ornament updated", data: updatedOrnament });
  } catch (error) {
    console.error("Error updating ornament:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//search Ornament
const searchOrnament = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    if (!searchTerm || !searchTerm.trim()) {
      return res.status(400).json({ error: "Search term is required" });
    }

    const regex = new RegExp(searchTerm.trim(), "i"); // match anywhere in string
    const ornaments = await Ornament.find({
      $or: [{ title: regex }, { category: regex }],
    });

    res.status(200).json(ornaments);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get Ornaments By section (New Arrival and Featured ornament)
const getOrnamentBySection = async (req, res) => {
  try {
    const { section } = req.params; // Use params instead of query for consistency
    const ornaments = await Ornament.find({ section });

    if (!ornaments || ornaments.length === 0) {
      return res
        .status(404)
        .json({ error: "No ornaments found for the specified section" });
    }

    res.status(200).json(ornaments);
  } catch (error) {
    console.error("Error getting ornament by section:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while getting ornament by section",
      });
  }
};

//Get ornament by category
const getOrnamentByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const ornaments = await Ornament.find({ category });

    if (!ornaments || ornaments.length === 0) {
      return res
        .status(404)
        .json({ error: "No ornaments found for the specified category" });
    }

    res.status(200).json(ornaments);
  } catch (error) {
    console.error("Error getting ornament by category:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while getting ornament by category",
      });
  }
};

module.exports = {
  findAll,
  save,
  findById,
  deleteById,
  update,
  searchOrnament,
  getOrnamentBySection,
  getOrnamentByCategory,
};
