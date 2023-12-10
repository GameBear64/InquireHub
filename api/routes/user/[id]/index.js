// const joi = require('joi');
// const throttle = require('express-throttle');
const ObjectId = require('mongoose').Types.ObjectId;
const { UserModel } = require('../../../models/User');
const { QuestionModel } = require('../../../models/Question');

// const { joiValidate } = require('../../middleware/validation');

module.exports.get = async (req, res) => {
  // const selectMail = req.params.id == req.apiUserId ? '+email' : ''
  // const user = await UserModel.findOne({ _id: req.params.id }).select(selectMail)
  const [user] = await UserModel.aggregate([
    { $match: { _id: ObjectId(req.params.id) } },
    {
      $lookup: {
        from: 'users',
        localField: 'following',
        foreignField: '_id',
        as: 'following',
      }
    },
    { $project: { name: 1, email: 1, biography: 1, picture: 1, answered: 1, following: 1 } }
  ])

  if (!user) return res.status(404).json('User not found');

  const questions = await QuestionModel.find({ author: req.params.id });

  const publicQuestions = questions.filter(q => !q.anonymous)

  const following = async () => {
    const current = await UserModel.findOne({ _id: req.apiUserId }).select('following')

    if (current.following.includes(user._id)) return true;

    return false;
  }

  return res.status(200).json({...user, publicQuestions, questions: questions.length, imFollowing: await following() });
};  