import slugify from "slugify";
import categoryModel from "../Models/categoryModel.js";

// CREATE
export const createCategoryControler = async (req, res) => {
    try {

        const { name } = req.body;
        if (!name) {
            return res.send({
                message: "Name is required"
            })
        }

        // checking for existing category
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.send({
                success: true,
                message: "Category already present"
            })
        }

        // category creation (save)
        const category = await new categoryModel({
            name,
            slug: slugify(name)
        }).save();

        res.send({
            success: true,
            message: "New category created",
            category
        })


    } catch (error) {
        console.log(error);
        res.send({
            status: false,
            message: "Error in category"
        })
    }
}

// UPDATE
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params

        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.send({
            success: true,
            message: "Updated successfully",
            category,
        })
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Error in updation"
        })
    }
}

// READ (all categories)
export const getCategoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find({})
        res.send({
            success: true,
            message: "All categories",
            categories
        })
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Failed to load all categories"
        })
    }
}

// READ (single category)
export const singleCategoryController = async (req, res) => {
    try {
        const { slug } = req.params
        const category = await categoryModel.findOne({ slug })
        res.send({
            success: true,
            message: "Single Category",
            category
        })
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Error getting single category"
        })
    }

}

// DELETE 
export const deleteCategoryController = async (req, res) => {
    try {

        const { id } = req.params
        console.log(id);
        const category = await categoryModel.findByIdAndDelete(id)
        res.send({
            success: true,
            message: "Deleted Successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.send({
            success: true,
            message: "Error in deletion"
        })
    }

}