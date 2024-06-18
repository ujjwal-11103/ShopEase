import express from "express";
import { registerController, loginController } from "../Controllers/authController.js"

// Router object

const router = express.Router();

// routing

// Register ||  POST 
router.post('/register', registerController)

// Login || POST
router.post('/login', loginController)



export default router