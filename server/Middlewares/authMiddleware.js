import JWT from "jsonwebtoken"
import userModel from "../Models/userModel.js"

// protected routes token bases
export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).send({
            successs: false,
            message: error
        })
    }
};

// admin access check
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if (user.role != 1) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized access"
            })
        }
        else
            next();

    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error: error,
            message: "Error in admin middleware"
        })
    }
}
