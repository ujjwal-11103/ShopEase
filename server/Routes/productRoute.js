import express from "express"
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";
import formidable from "express-formidable"
import { createProductController, deleteProductController, getPhotoProductController, getProductController, getSingleProductController, updateProductController } from "../Controllers/ProductController.js";

const router = express.Router();

// CREATE
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

// READ (ALL)
router.get('/get-product', getProductController)

// READ (single)
router.get('/get-single-product/:slug', getSingleProductController)

// GET photo
router.get('/get-photo/:pid', getPhotoProductController)

// DELETE
router.delete("/delete-product/:productid", requireSignIn, isAdmin, formidable(), deleteProductController)

// UPDATE 
router.put("/update-product/:productid", requireSignIn, isAdmin, formidable(), updateProductController)

export default router