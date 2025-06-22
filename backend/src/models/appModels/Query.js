const { customer } = require("@/locale/translation/en_us");
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    text: {
    type: String,
    required: true,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const querySchema = new mongoose.Schema({
   customer: {
      type: mongoose.Schema.ObjectId,
      ref: 'Client',
      required: true,
      autopopulate: true,
    },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Open', 'InProgress', 'Closed'],
    default: 'Open'
  },
  resolution: {
    type: String,
    maxlength: 100
  },
  notes: [noteSchema],
  created: {
    type: Date,
    default: Date.now
  }
});

querySchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("Query", querySchema);

