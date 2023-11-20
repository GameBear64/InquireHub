const joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;
const { QuestionModel } = require('../../../models/Question');
const { joiValidate, InformationTypes, isObjectID } = require('../../../middleware/validation');

// answer implies that a owner is searching
module.exports.get = [
  joiValidate({ 
    id: joi.custom(isObjectID),
    answer: joi.custom(isObjectID)
  }, InformationTypes.PARAMS),
  async (req, res) => {
    const [ question ] = await QuestionModel.aggregate([
      { $match: { _id: ObjectId(req.params.id), author: ObjectId(req.apiUserId) }},
      {
        $lookup: {
          from: 'answers',
          localField: 'answers',
          foreignField: '_id',
          pipeline: [
            { $match: { _id: ObjectId(req.params.answer) } },
          //   { $project: { message: { $slice: ['$messages', 0, 1] } } }, // pagination
            {
              $lookup: {
                from: 'messages',
                localField: 'messages',
                foreignField: '_id',
                pipeline: [{ $project: { body: 1, author: 1, reaction: 1 } }], // will need to include created and updated at
                as: 'messages',
              }
            },
            { $project: { messages: 1 } },
          ],
          as: 'answer',
        }
      },
      { $unwind: { path: "$answer", preserveNullAndEmptyArrays: true }},
      { $project: { answer: { $ifNull: [ "$answer", {} ]}, title: 1, body: 1 } },
    ])

    return res.status(200).json(question);
  }
]