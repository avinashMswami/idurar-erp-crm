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
  customerName: {
      type: mongoose.Schema.ObjectId,
      ref: 'Client',
      autopopulate: {select: 'name'},
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

