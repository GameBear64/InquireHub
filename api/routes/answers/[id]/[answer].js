const joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;
const { QuestionModel } = require('../../../models/Question');
const { joiValidate, InformationTypes, isObjectID } = require('../../../middleware/validation');

const { answer } = require('../../../reusable/aggregations')

// answer implies that a owner is searching
module.exports.get = [
  joiValidate({ 
    id: joi.custom(isObjectID),
    answer: joi.custom(isObjectID) // really just catching when the owner is searching
  }, InformationTypes.PARAMS),
  async (req, res) => {
    const [ question ] = await QuestionModel.aggregate([
      { $match: { _id: ObjectId(req.params.id), author: ObjectId(req.apiUserId) }},
      ...answer
    ])
    
    if (question?.anonymous) {
      question.answer.messages = question.answer.messages.map(({author, ...rest}) => ({
        ...rest, author: author._id.toString() === req.apiUserId ? author : null 
      }))
    }

    return res.status(200).json(question);
  }
]