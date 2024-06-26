import express from "express"
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";
import { createCategoryControler, updateCategoryController } from "../Controllers/CategoryController.js";

const router = express.Router();
// CREATE
router.post('/create-category', requireSignIn, isAdmin, createCategoryControler)
// UPDATE
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)


export default router