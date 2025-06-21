const mongoose = require('mongoose');
const Model = mongoose.model('Query');

const addNote = async (req, res) => {
  const id = req.params.id;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Invalid Query ID!',
    });
  }

  const { text } = req.body;

  // Validate note text
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Note text is required!',
    });
  }

  const note = {
    text: text.trim(),
    created: new Date(),
  };

  try {
    const result = await Model.findByIdAndUpdate(
      id,
      { $push: { notes: note } },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Query not found!',
      });
    }

    return res.status(200).json({
      success: true,
      result,
      message: 'Note added successfully!',
    });
  } catch (error) {
    console.error('Error adding note:', error.message);
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Server error while adding note!',
    });
  }
};

module.exports = addNote;