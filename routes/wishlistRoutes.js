const express = require('express');
const {
    getWishList,
    getWishlistById,
    createWishList,
    deleteWishList
} = require('../controller/wishlistController');

const router = express.Router();

router.get('/', getWishList);
router.get('/user/:userId', getWishlistById);
router.post('/', createWishList);
router.delete('/:id', deleteWishList);

module.exports = router;