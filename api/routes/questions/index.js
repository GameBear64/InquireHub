const ObjectId = require('mongoose').Types.ObjectId;
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
          { $project: { message: { $last: '$messages' } } },
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
          { $project: { message: '$message.body' } },
        ],
        as: 'answers',
      }
    },
  ])

  return res.status(200).json(list);
} 