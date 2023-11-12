const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    body: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
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
