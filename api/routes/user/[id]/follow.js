const { UserModel } = require('../../../models/User');

module.exports.get = async (req, res) => {

  await UserModel.updateOne({ _id: req.apiUserId }, { $push: { following: req.params.id } });

  return res.status(200).json();
} 