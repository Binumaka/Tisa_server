const express = require("express");
const {
  createWishList,
  getWishlistById,
  removeFromWishlist,
} = require("../controller/wishlistController");

const router = express.Router();

router.post("/save", createWishList);
router.get("/:userId", getWishlistById);
router.delete("/:userId/:ornamentId", removeFromWishlist);

module.exports = router;
