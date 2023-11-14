const joi = require('joi');
// const throttle = require('express-throttle');
const { QuestionModel } = require('../../models/Question');
const { joiValidate } = require('../../middleware/validation');

module.exports.get = async (req, res) => {
  // TODO: pagination
  const list = await QuestionModel.find({author: req.apiUserId});  

  return res.status(200).json(list);
} 

module.exports.post = [
  // throttle?
  joiValidate({
    title: joi.string().min(5).max(50).optional().allow(''),
    body: joi.string().min(5).max(2000).required(),
    anonymous: joi.boolean(),
    // media: joi.string().min(5).max(5242880).optional(), // 5 MB
  }),
  async (req, res) => {
  await QuestionModel.create({ ...req.body, author: req.apiUserId });

  return res.status(200).json();
}];