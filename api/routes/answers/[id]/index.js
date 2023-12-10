const joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;
const { QuestionModel } = require('../../../models/Question');
const { AnswerModel } = require('../../../models/Answer');
const { joiValidate, InformationTypes, isObjectID } = require('../../../middleware/validation');

const { answer } = require('../../../reusable/aggregations')

module.exports.get = [
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  async (req, res) => {    
    // const question = await QuestionModel.findOne({ _id: req.params.id, seen: { '$eq': req.apiUserId } })

    const [ question ] = await QuestionModel.aggregate([
      { $match: { _id: ObjectId(req.params.id), seen: { '$eq': ObjectId(req.apiUserId) } }},
      ...answer
    ])

    if (question.anonymous) {
      question.answer.messages = question.answer.messages.map(message => ({
        ...message, author: message.author._id.toString() === req.apiUserId ? message.author : null,
      }))
    }

    return res.status(200).json(question);
  }
]

module.exports.delete = [
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  async (req, res) => {
    // allow owner of question to delete as well
    const answer = await AnswerModel.findOne({_id: ObjectId(req.params.id)})
    const question = await AnswerModel.findOne({_id: ObjectId(req.params.id)})

    if (answer.author !== req.apiUserId ) return res.status(404).json()

    await answer.deleteOne()

    return res.status(200).json()
  }
]