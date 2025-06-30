const express = require('express');
const {
    createOrder,
    getAllOrders,
    getOrdersByUser,
    cancelOrder
} = require('../controller/orderController');

const router = express.Router();

router.get('/', getAllOrders);
router.get('/:userId', getOrdersByUser);
router.post('/create', createOrder);
router.patch('/:id', cancelOrder);

module.exports = router;