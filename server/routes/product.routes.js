import { Router } from 'express';

import { createProduct, getAllProducts, getProductById } from '../controller/product.controller.js';




const router=Router();

router.route("/createProduct").post(createProduct)
router.get('/getallproducts', getAllProducts);
router.get('/product/:id', getProductById);







export default router;