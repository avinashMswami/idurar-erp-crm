const mongoose = require('mongoose');
const Model = mongoose.model('Query');

const deleteNote = async (req, res) => {
  const { id, noteId } = req.params;

  // Validate IDs
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Invalid Query ID!',
    });
  }

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Invalid Note ID!',
    });
  }

  try {
    const result = await Model.findByIdAndUpdate(
      id,
      { $pull: { notes: { _id: noteId } } }, // ✅ this is the core fix
      { new: true }
    );

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
      message: 'Note deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting note:', error.message);
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Server error while deleting note',
    });
  }
};

module.exports = deleteNote;