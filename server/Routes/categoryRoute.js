import express from "express"
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";
import { createCategoryControler, deleteCategoryController, getCategoryController, singleCategoryController, updateCategoryController } from "../Controllers/CategoryController.js";

const router = express.Router();

// CREATE
router.post('/create-category', requireSignIn, isAdmin, createCategoryControler)

// UPDATE
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

// READ (all categories)
router.get('/get-categories', getCategoryController)

// READ (single category)
router.get('/single-category/:slug', singleCategoryController)

// DELETE 
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)



export default router
