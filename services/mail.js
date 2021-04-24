const User = require('../models/user');
const Mail = require('../models/mail');

const { UserInputError } = require('apollo-server');

const getMail = async (userId) => {
  const user = await User.findById(userId);
  console.log(user);
}

const sendMail = async ({
  senderUsername,
  receiversUsername,
  subject,
  body
}) => {
  const sender = await User.find({ username: senderUsername }).exec();
  if (!sender.length) {
    // case: sender not found
    throw new UserInputError('Sender not found');
  }

  const receivers = await Promise.all(receiversUsername.map(async receiverUsername => {
    const receiver = await User.find({ username: receiverUsername }).exec();
    if (!receiver.length) {
      // case: receiver not found
      throw new UserInputError('Receiver not found');
    }

    return receiver[0]
  }));

  // create mail
  const mail = new Mail({
    sender: sender[0]._id,
    receivers: receivers.map(receiver => receiver._id),
    subject,
    body
  });
  mail.save();

  // add mail to sender outbox
  sender[0].outbox.push(mail._id);
  sender[0].save();
  
  // add mail to receiver inboxes
  receivers.forEach(receiver => {
    receiver.inbox.push(mail._id);
    receiver.save();
  });

  return mail;
}

module.exports = {
  getMail,
  sendMail
}