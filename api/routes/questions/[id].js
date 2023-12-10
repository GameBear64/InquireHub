const joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;

const { QuestionModel } = require('../../models/Question');
const { joiValidate, InformationTypes, isObjectID } = require('../../middleware/validation');

module.exports.patch = [
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  joiValidate({
    title: joi.string().min(5).max(50).optional().allow(''),
    body: joi.string().min(5).max(2000).required(),
  }),
  async (req, res) => {
    const question = await QuestionModel.findOne({_id: ObjectId(req.params.id), author: ObjectId(req.apiUserId)})

    if (!question) return res.status(404).json()

    await question.updateOne({...req.body})

    return res.status(200).json()
  }
]

module.exports.delete = [
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  async (req, res) => {
    const answer = await QuestionModel.findOne({_id: ObjectId(req.params.id), author: ObjectId(req.apiUserId)})

    if (!answer) return res.status(404).json()

    await answer.deleteOne()

    return res.status(200).json()
  }
]