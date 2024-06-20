import express from "express";
import { registerController, loginController, testController } from "../Controllers/authController.js"
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";

// Router object

const router = express.Router();

// routing

// Register ||  POST 
router.post('/register', registerController)

// Login || POST
router.post('/login', loginController)

// test middleware
router.get('/test', requireSignIn, isAdmin, testController)

export default router