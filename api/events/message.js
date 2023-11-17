const { QuestionModel } = require('../models/Question');
const { AnswerModel } = require('../models/Answer');
const { MessageModel } = require('../models/Message');

module.exports = async ({ io, socket }, data) => {
  const question = await QuestionModel.findOne({_id: data.id}).populate('answers', 'author')
  if (!question) return socket.emit('error', question);

  let tempAnswer
  
  let answerId = question.answers.find(answer => answer.author == socket.apiUserId)?._id || data.answer
  const newMessage = await MessageModel.create({ author: socket.apiUserId, body: data.body }); 
  
  if (answerId) {
    tempAnswer = await AnswerModel.findOneAndUpdate({ _id: answerId }, { $push: { messages: { $each: [newMessage.id], $position: 0 }}})
  } else {
    const newAnswer = await AnswerModel.create({ author: socket.apiUserId, messages: [newMessage.id] })
    await question.updateOne({ $push: { answers: newAnswer } })

    tempAnswer = {...newAnswer.toJSON(), author: { _id: socket.apiUserId }}
  }
  
  io.to(question.author.toString()).to(tempAnswer.author._id.toString()).emit('message', {answerId: tempAnswer._id.toString(), message: newMessage});
};
