// const joi = require('joi');
// const throttle = require('express-throttle');
const { UserModel } = require('../../models/User');
// const { joiValidate } = require('../../middleware/validation');

module.exports.get = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.params.id })
  if (!user) return res.status(404).json('User not found');

  return res.status(200).json(user);
};