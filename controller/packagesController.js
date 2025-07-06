const Packages = require("../model/packagesModel");

// Get all tour packages
const findAllPackages = async (req, res) => {
  try {
    const packages = await Packages.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new package
const createPackage = async (req, res) => {
  try {
    const { title, totalprice, description, ornamentId } = req.body;

    if (!title || !totalprice || !description || !ornamentId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const image =
      req.files && req.files["image"]
        ? req.files["image"][0].filename
        : null;

    const newPackage = new Packages({
      title,
      image,
      description,
      ornamentId,
      totalprice,
    });

    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get package by ID
const findById = async (req, res) => {
  try {
    const foundPackage = await Packages.findById(req.params.id);
    if (!foundPackage) {
      return res.status(404).json({ error: "Package not found" });
    }
    res.status(200).json(foundPackage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a package
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const existingPackage = await Packages.findById(id);

    if (!existingPackage) {
      return res.status(404).json({ error: "Package not found" });
    }

    const updatedData = { ...req.body };

    if (req.files && req.files["image"]) {
      updatedData.image = req.files["image"][0].filename;
    }

    const updatedPackage = await Packages.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json({ message: "Package updated", data: updatedPackage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete package by ID
const deleteById = async (req, res) => {
  try {
    const deleted = await Packages.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Package not found" });
    }
    res.status(200).json({ message: "Package deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  findAllPackages,
  createPackage,
  findById,
  update,
  deleteById,
};
