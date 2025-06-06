const express = require('express');
const {
    createRentOrder,
    getAllRentOrder,
    getRentOrderByUser,
    cancelRentOrder
} = require('../controller/rentCheckoutController');

const router = express.Router();

router.get('/', getAllRentOrder);
router.get('/:userId', getRentOrderByUser);
router.post('/create', createRentOrder);
router.patch('/:id', cancelRentOrder);

module.exports = router;