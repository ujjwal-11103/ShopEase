import express from "express";
import { registerController, loginController, testController, updateProfileController, orderController, allOrderController, orderStatusController } from "../Controllers/authController.js"
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";

// Router object

const router = express.Router();

// routing

// Register ||  POST 
router.post('/register', registerController)

// Login || POSTdgfdgdf
router.post('/login', loginController)

// dashboard user || GET
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({
        ok: true,
    })
})
// dashboard admin || GET
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({
        ok: true,
    })
})

//Update Profile
router.put('/profileUpdate', requireSignIn, updateProfileController)

// get orders
router.get("/orders", requireSignIn, orderController)

// getAllOrders
router.get("/all-orders", requireSignIn, isAdmin, allOrderController)

// Orders status
router.put("/orders-status/:orderId", requireSignIn, isAdmin, orderStatusController)



// test middleware
router.put('/test', requireSignIn, isAdmin, testController)

export default router