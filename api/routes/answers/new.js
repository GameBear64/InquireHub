const { QuestionModel } = require('../../models/Question');

module.exports.get = async (req, res) => {
  const question = await QuestionModel
    .findOne({ rejected: { "$ne": req.apiUserId }, seen: { "$ne": req.apiUserId }, author: { "$ne": req.apiUserId }})
    .sort({ createdAt: -1 })

  if (!question) return res.status(404).json('No more questions');

  await question.updateOne({ $push: { seen: req.apiUserId } });

  return res.status(200).json(question);
} 