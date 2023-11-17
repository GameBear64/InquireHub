const joi = require('joi');
const { UserModel } = require('../../models/User');
const { joiValidate } = require('../../middleware/validation');
const { createJWT } = require('../../utils');

module.exports.patch = [
  joiValidate({
    password: joi.string().min(8).max(255).required(),
    newPassword: joi.string().min(8).max(255).required(),
    confirmPassword: joi.string().valid(joi.ref('newPassword')).required().messages({
      'any.only': 'Confirmation password did not match.',
    }),
  }),
  async (req, res) => {
    let user = await UserModel.findOne({ _id: req.apiUserId }).select('password');

    let validPassword = await user.validatePassword(req.body.password);
    if (!validPassword) return res.status(400).json('Incorrect password.');

    // weird mongo behavior, need this to trigger the save hook
    user.password = req.body.newPassword;
    await user.save();

    return res.status(200).json({ jwt: createJWT(user) });
  },
];