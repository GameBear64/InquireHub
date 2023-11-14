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
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
      },
    ],
  },
  { timestamps: true}
);

exports.QuestionModel = mongoose.model('Question', questionSchema);
