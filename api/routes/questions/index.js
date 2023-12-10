const joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;

const { joiValidate } = require('../../middleware/validation');

const { QuestionModel } = require('../../models/Question');

module.exports.get = async (req, res) => {
  const list = await QuestionModel.aggregate([
    { $match: { author: ObjectId(req.apiUserId) }},
    { $sort: { updatedAt: -1 } },
    {
      $lookup: {
        from: 'answers',
        localField: 'answers',
        foreignField: '_id',
        pipeline: [
          { $sort: { updatedAt: -1 } },
          { $project: { message: { $last: '$messages' }, createdAt: 1 } },
          {
            $lookup: {
              from: 'messages',
              localField: 'message',
              foreignField: '_id',
              pipeline: [{ $project: { body: 1 } }],
              as: 'message',
            }
          },
          { $unwind: '$message' }, // test unwind further
          { $project: { message: '$message.body', createdAt: 1 } },
        ],
        as: 'answers',
      }
    },
    { $project: { seen: 0 } },
  ])

  return res.status(200).json(list);
}

module.exports.post = [
  joiValidate({
    title: joi.string().min(5).max(50).optional().allow(''),
    body: joi.string().min(5).max(2000).required(),
    anonymous: joi.boolean(),
  }),
  async (req, res) => {
    // check if the user has answered at least 3 questions before asking again
    const created = await QuestionModel.create({ ...req.body, author: req.apiUserId });

    return res.status(200).json(created);
  }
];