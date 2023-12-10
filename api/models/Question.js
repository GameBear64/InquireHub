const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
    },
    body: {
      type: String,
      required: true
    },
    anonymous: {
      type: Boolean,
      default: true
    },
    seen: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    answers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer',
    }],
  },
  { timestamps: true}
);

exports.QuestionModel = mongoose.model('Question', questionSchema);
