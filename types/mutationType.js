const { 
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLScalarType
} = require('graphql');
const userType = require('./userType');
const mailType = require('./mailType');
const { register, login } = require('../services/auth');
const { sendMail } = require('../services/mail');

// root mutation type
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register: { // mutation to register new user
      type: userType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return register(args);
      }
    },
    login: { // mutation to login
      type: userType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return login(args);
      }
    },
    sendMail: { // mutation to send mail
      type: mailType,
      args: {
        senderUsername: { type: GraphQLString },
        receiversUsername: { type: new GraphQLList(GraphQLString) },
        subject: { type: GraphQLString },
        body: { type: GraphQLString }
      },
      resolve(_, args) {
        return sendMail(args);
      }
    }
  }
});

module.exports = mutationType;