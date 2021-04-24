const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList
} = require('graphql');
const userType = require('./userType');
const Mail = require('../models/mail');

const mailType = new GraphQLObjectType({
  name: 'Mail',
  fields: {
    id: { 
      type: GraphQLString,
      resolve (parent, args, context, info) {
        return parent.id || parent._id;
      } 
    },
    sender: {
      type: userType,
      async resolve(parent) {
        const mail = await Mail.findById(parent.id).populate('sender');
        return mail.sender;
      }
    },
    // receivers: { 
    //   type: new GraphQLList(userType),
    //   async resolve(parent) {
    //     const mail = await Mail.findById(parent.id).populate('receivers');
    //     return mail.receivers;
    //   }
    // },
    subject: { type: GraphQLString },
    body: { type: GraphQLString }
  }
});

module.exports = mailType;