import express from 'express';
import { createOrder, getOrders, updateOrder, deleteOrder } from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getOrders);
router.put('/:id', protect, updateOrder)
router.delete('/:id', protect, deleteOrder)

export default router;
