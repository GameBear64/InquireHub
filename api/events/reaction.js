const { QuestionModel } = require('../models/Question');
const { AnswerModel } = require('../models/Answer');
const { MessageModel } = require('../models/Message');

module.exports = async ({ io, socket }, data) => {
  const updatedMessage = await MessageModel.findOneAndUpdate({ _id: data.messageId }, { reaction: data.reaction });
  if (!updatedMessage) return socket.emit('error', 'Message not found')

  const answer = await AnswerModel.findOne({ messages: {$in: updatedMessage._id}})
  const question = await QuestionModel.findOne({ answers: { $in: answer._id} })
  
  io.to(question.author.toString()).to(answer.author.toString()).emit('reaction', {answerId: answer._id.toString(), messageId: updatedMessage._id.toString(), reaction: data.reaction});
};