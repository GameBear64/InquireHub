const ObjectId = require('mongoose').Types.ObjectId;
const { QuestionModel } = require('../../models/Question');

module.exports.get = async (req, res) => {
  const list = await QuestionModel.aggregate([
    { $match: { seen: { $eq: ObjectId(req.apiUserId) } }},
    { $sort: { updatedAt: -1 } },
    {
      $lookup: {
        from: 'answers',
        localField: 'answers',
        foreignField: '_id',
        pipeline: [
          { $match: { author: ObjectId(req.apiUserId) } },
          { $project: { id: 1 } }
        ],
        as: 'answers',
      }
    },
    { $project: { answer: { $arrayElemAt: ['$answer._id', 0]}, title: 1, body: 1 } }
  ])

  return res.status(200).json(list);
}