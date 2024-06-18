import { hashPassword } from "../Helpers/authHelper.js"
import userModel from "../Models/userModel.js"

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body

        // validation
        if (!name) {
            return res.send({ error: "Name is required" })
        }
        if (!email) {
            return res.send({ error: "email is required" })
        }
        if (!password) {
            return res.send({ error: "password is required" })
        }
        if (!phone) {
            return res.send({ error: "phone is required" })
        }
        if (!address) {
            return res.send({ error: "address is required" })
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

