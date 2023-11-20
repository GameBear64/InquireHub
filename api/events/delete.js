const { QuestionModel } = require('../models/Question');
const { AnswerModel } = require('../models/Answer');
const { MessageModel } = require('../models/Message');

module.exports = async ({ io, socket }, data) => {
  const foundMessage = await MessageModel.findOne({ _id: data.messageId });
  if (!foundMessage) return socket.emit('error', 'Message not found');
  if (foundMessage.author.toString() !== socket.apiUserId) return socket.emit('error', 'You can only delete messages you own')

  await foundMessage.deleteOne();

  const answer = await AnswerModel.findOne({ messages: {$in: data.messageId}})
  await AnswerModel.updateOne({ $pull: { messages: data.messageId } })

  const question = await QuestionModel.findOne({ answers: { $in: answer._id} })
  
  io.to(question.author.toString()).to(answer.author.toString()).emit('delete', {answerId: answer._id.toString(), messageId: data.messageId, reaction: data.reaction});
};