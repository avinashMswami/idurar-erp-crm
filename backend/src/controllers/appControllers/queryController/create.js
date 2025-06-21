const mongoose = require('mongoose');
const Model = mongoose.model('Query');
const Schema = require('./schemaValidate');

const create = async (req, res) => {
  const body = req.body;

  const { error, value } = Schema.validate(body);

  if (error) {
    const { details } = error;
    return res.status(400).json({
      success: false,
      result: null,
      message: details[0]?.message,
    });
  }

  try {
    const queryData = {
      ...value,
      createdBy: req.admin?._id,
    };

    const result = await new Model(queryData).save();

    return res.status(200).json({
      success: true,
      result,
      message: 'Query created successfully!',
    });
  } catch (error) {
    console.error('create query error:', error.message);
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Server error while creating a query.',
    });
  }
};

module.exports = create;
