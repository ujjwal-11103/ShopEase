import { comparePassword, hashPassword } from "../Helpers/authHelper.js"
import userModel from "../Models/userModel.js"
import JWT from "jsonwebtoken"

// registerController
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body

        // validation
        if (!name) {
            return res.send({ message: "Name is required" })
        }
        if (!email) {
            return res.send({ message: "email is required" })
        }
        if (!password) {
            return res.send({ message: "password is required" })
        }
        if (!phone) {
            return res.send({ message: "phone is required" })
        }
        if (!address) {
            return res.send({ message: "address is required" })
        }

        // existing user
        const existinguser = await userModel.findOne({ email })
        if (existinguser) {
            return res.status(200).send({
                success: true,
                message: "Already Registered Please Login"
            })
        }

        // register user and sending data (password) for hashing
        const hashedPassword = await hashPassword(password)

        // save
        const user = await new userModel({
            name,
            email,
            password: hashedPassword,
            phone,
            address
        }).save();

        res.status(201).send({
            success: true,
            message: "User register successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error registering user"
        })
    }
}

// loginController
export const loginController = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).send({
                success: false,
                message: "Invalid email and Password"
            })
        }

        // check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "Email is not registered"
            })
        }

        // check for password
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }

        // Token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        const hashedPassword = await hashPassword(user.password)
        return res.status(200).send({
            success: true,
            message: "Login successfull",
            user: {
                name: user.name,
                email: user.email,
                password: hashedPassword,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token,
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            successs: false,
            message: "Error in login"
        })
    }

}


// profileUpdate
export const updateProfileController = async (req, res) => {

    const { name, password, address, phone } = req.body

    try {

        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedProfile = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address
        }, {
            new: true
        })

        res.send({
            success: true,
            message: "Profile Updated successfully",
            updatedProfile
        })

    } catch (error) {
        res.send({
            success: false,
            error: error,
            message: "error in profile updation"
        })
    }
}


// test controller
export const testController = (req, res) => {

    try {
        console.log("Protected route");
        res.status(200).send({
            message: "Protected Route"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in testController"
        })
    }

}
