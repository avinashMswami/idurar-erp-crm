const mongoose = require("mongoose");

const Model = mongoose.model('Query');


const read = async (req,res)=>{
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            result: null,
            message: "Invalid ID format"
        });  
    }

    try {
        const result = await Model.findById(id).exec();

        if(!result){
            return res.status(404).json({
                success: false,
                result: null,
                message: "No query found"
            });
        }

        res.status(200).json({
            success: true,
            result,
            message: "Query found successfully"
        });

    } catch (error) {
        console.error('Error in Query Read: ', error.message);
        return res.status(500).json({
            success: false,
            result: null,
            message: "Server error while fetching query!"
        });
    }
}

module.exports = read;