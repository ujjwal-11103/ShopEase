import slugify from "slugify";
import productModel from "../Models/productModel.js";
import fs from "fs"

// CREATE
export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.fields;
        const { photo } = req.files

        switch (true) {
            case !name:
                return res.send({ message: "Name is required" })
            case !description:
                return res.send({ message: "description is required" })
            case !price:
                return res.send({ message: "price is required" })
            case !category:
                return res.send({ message: "category is required" })
            case !quantity:
                return res.send({ message: "quantity is required" })
            case photo && photo.size > 1000000:
                return res.send({ message: "Photo is required and must <1mb" })
        }



        // const product = await new productModel({
        //     name,
        //     slug: (slugify(name)),
        //     description,
        //     price, category, quantity, shipping
        // }).save();


        const products = await new productModel({
            ...req.fields,
            slug: (slugify(name)),
        })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }

        await products.save();

        res.send({
            success: true,
            message: "Product created successfully",
            products
        })

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "error in creation of product"
        })
    }
}

//READ (ALL)
export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 }).populate("category");

        res.send({
            status: true,
            countTota: products.length,
            message: "All products",
            products
        })

    } catch (error) {
        console.log(error);
        res.send({
            status: false,
            message: "Error ingetching all products"
        })

    }
}

// READ (SINGLE)
export const getSingleProductController = async (req, res) => {
    try {
        const { slug } = req.params
        console.log(slug);
        const products = await productModel.findOne({ slug }).select("-photo").populate("category");

        res.send({
            status: true,
            message: "Single product",
            products
        })

    } catch (error) {
        console.log(error);
        res.send({
            status: false,
            message: "Error in fetching single product"
        })
    }
}

// get photo
export const getPhotoProductController = async (req, res) => {

    try {
        const { pid } = req.params

        const product = await productModel.findById(pid).select("photo")
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType)
            return res.send(product.photo.data)
        }
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Failed to load photo"
        })
    }

}

// DELETE
export const deleteProductController = async (req, res) => {
    try {

        const { productid } = req.params;
        const product = await productModel.findByIdAndDelete(productid)

        res.send({
            success: true,
            message: "product deleted successfully",
            product
        })
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Failed to delete product"
        })
    }
}

// UPDATE
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.fields;
        const { photo } = req.files

        switch (true) {
            case !name:
                return res.send({ message: "Name is required" })
            case !description:
                return res.send({ message: "description is required" })
            case !price:
                return res.send({ message: "price is required" })
            case !category:
                return res.send({ message: "category is required" })
            case !quantity:
                return res.send({ message: "quantity is required" })
            case photo && photo.size > 1000000:
                return res.send({ message: "Photo is required and must <1mb" })
        }

        const products = await productModel.findByIdAndUpdate(req.params.productid, { ...req.fields, slug: slugify(name) }, { new: true })

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }

        res.send({
            status: true,
            message: "Product updated successfully",
            products
        })

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Error in updation of product"
        })
    }
}