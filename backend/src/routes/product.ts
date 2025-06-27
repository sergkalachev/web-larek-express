import express from 'express';
import { getAllProducts, createProduct } from '../controllers/product';
import validator from '../middlewares/validators';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', validator.validateProductBody, createProduct);

export default router;
