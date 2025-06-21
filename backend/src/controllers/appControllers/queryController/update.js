const mongoose = require("mongoose");

const Model = mongoose.model('Query');


const update = async (req,res) =>{

    const id= req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            result: null,
            message: "Invalid ID Format!"
        });
    }

    const {status, resolution} = req.body;

// status validation
    const allowedStatus = ['Open', 'InProgress', 'Closed'];
    if (status && !allowedStatus.includes(status)) {
        return res.status(400).json({
            success: false,
            result: null,
            message: 'Invalid status value',
        });
    }

// resolution validation
    if (resolution && resolution.length > 100) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Resolution must be 100 characters or less.',
    });
  }

  try {
    const result = await Model.findOneAndUpdate(
        {_id: id},
        {...(status && {status}), ...(resolution && {resolution})},
        {new: true} // To return the updated data for this id. By default it returns the old data.
    ).exec();

    
    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Query not found',
      });
    }

    return res.status(200).json({
      success: true,
      result,
      message: 'Query updated successfully',
    });


      } catch (error) {
    console.error('Update query error:', error.message);
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Server error while updating query',
    });
  }
  }

module.exports = update;