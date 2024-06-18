import express from "express";
import { registerController} from "../Controllers/authController.js"

// Router object

const router = express.Router();

// routing
// REGISTER || METHOD = POST 
router.post('/register', registerController)





export default router