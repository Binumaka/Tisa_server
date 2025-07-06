const WishList = require("../model/wishlistModel");
const mongoose = require("mongoose");

const getWishList = async (req, res) => {
  try {
    const wishList = await WishList.find();
    res.status(200).json(wishList);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch wishList" });
  }
};


const getWishlistById = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const wishlist = await WishList.find({ userId }).populate("ornamentId");

    return res.status(200).json(wishlist);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const createWishList = async (req, res) => {
  try {
    const newWishList = new WishList(req.body);
    const savedWishList = await newWishList.save();
    res.status(201).json(savedWishList);
  } catch (error) {
    res.status(500).json({ error: "Failed to create the WishList" });
  }
};


const deleteWishList = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWishlist = await WishList.findByIdAndDelete(id);
    if (!deletedWishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }
    res.status(200).json({ message: "Wishlist deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the wishlist" });
  }
};

module.exports = {
  getWishList,
  getWishlistById,
  createWishList,
  deleteWishList,
};
