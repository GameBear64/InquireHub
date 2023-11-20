const { QuestionModel } = require('../models/Question');
const { AnswerModel } = require('../models/Answer');
const { MessageModel } = require('../models/Message');

module.exports = async ({ io, socket }, data) => {
  const updateMessage = await MessageModel.findOne({ _id: data.messageId });
  if (!updateMessage) return socket.emit('error', 'Message not found')
  if (updateMessage.author.toString() !== socket.apiUserId) return socket.emit('error', 'You can only delete messages you own')

  await updateMessage.updateOne({body: data.body})

  const answer = await AnswerModel.findOne({ messages: {$in: updateMessage._id}})
  const question = await QuestionModel.findOne({ answers: { $in: answer._id} })
  
  io.to(question.author.toString()).to(answer.author.toString()).emit('edit', {answerId: answer._id.toString(), messageId: updateMessage._id.toString(), body: data.body});
};