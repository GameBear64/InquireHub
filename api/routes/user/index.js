const joi = require('joi');
const { UserModel } = require('../../models/User');
const { joiValidate } = require('../../middleware/validation');

module.exports.patch = [
    joiValidate({
      name: joi.string().min(3).max(50).optional(),
      email: joi.string().min(10).max(255).optional().email(),
      biography: joi.string().min(3).max(50).optional().allow(''),
      picture: joi.string().min(3).max(50).optional().allow(''),
    }),
    async (req, res) => {
    await UserModel.updateOne({ _id: req.apiUserId }, { ...req.body });

    return res.status(200).json();
  }
]

module.exports.delete = [
  joiValidate({ password: joi.string().min(8).max(255).required()}),
  async (req, res) => {
    let user = await UserModel.findOne({ _id: req.apiUserId }).select('password');

    let validPassword = await user.validatePassword(req.body.password);
    if (!validPassword) return res.status(400).json('Incorrect password.');

    await user.deleteOne();

    return res.status(200).json();
  },
];