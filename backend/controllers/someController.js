// controllers/someController.js

const Books = require('../models/user');

// Update data
exports.updateData = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;  // The data to update

    try {
        // Find the document by ID and update it
        const updatedRecord = await Books.findByIdAndUpdate(id, updatedData, { new: true });
        
        if (!updatedRecord) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.json({
            message: "Record updated successfully",
            data: updatedRecord
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating data", error });
    }
};
