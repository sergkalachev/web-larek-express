import express from 'express';
import createOrder from '../controllers/order';
import validator from '../middlewares/validators'; // Assuming you have a validator for order creation

const router = express.Router();

router.post('/', validator.validateOrderBody, createOrder);

export default router;
