import express from 'express';
import VerifyToken from '../middleware/middleware.js';
import ProductController from '../controller/ProductController.js';

const productRouter = express.Router();
const productController = new ProductController

//add product
productRouter.post('/add-prod', VerifyToken);
productRouter.post('/add-prod', productController.addProduct);

export default productRouter