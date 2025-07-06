const express = require('express');
const {
    addToCart,
    getCartById,
    removeFromCart
} = require('../controller/shoppingCartController');

const router = express.Router();

router.post('/save', addToCart);
router.get('/:userId', getCartById);
router.delete('/:id', removeFromCart);

module.exports = router;