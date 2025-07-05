const userModel = require("../models/user");

const getAllUsers = async (req, res) => {
    const allusers = await userModel.find({})

    res.status(200).json({
        message: "all users fetched",
        allusers
    })
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        res.status(200).json({
            message: "User fetched successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user",
            error: error.message
        });
    }
}

const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, gender } = req.body;
        
        // Check if user with email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists"
            });
        }
        
        const newUser = new userModel({
            first_name,
            last_name,
            email,
            gender
        });
        
        const savedUser = await newUser.save();
        
        res.status(201).json({
            message: "User created successfully",
            user: savedUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        // Check if user exists
        const existingUser = await userModel.findById(id);
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        // If email is being updated, check for uniqueness
        if (updateData.email && updateData.email !== existingUser.email) {
            const emailExists = await userModel.findOne({ email: updateData.email });
            if (emailExists) {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }
        }
        
        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating user",
            error: error.message
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await userModel.findByIdAndDelete(id);
        
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        res.status(200).json({
            message: "User deleted successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting user",
            error: error.message
        });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}