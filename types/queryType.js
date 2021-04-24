const { 
  GraphQLString,
  GraphQLObjectType,
  GraphQLList
} = require('graphql');
const userType = require('./userType');
const mailType = require('./mailType');
const User = require('../models/user');
const Mail = require('../models/mail');
const { getMail } = require('../services/mail')

// root query type
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: { // query to get all users
      type: new GraphQLList(userType),
      resolve(_, args, context) {
        return User.find({});
      }
    },
    user: { // query to get user by id
      type: userType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(_, { id }) {
        return User.findById(id, (_, user) => user);
      }
    },
    mails: { // query to get emails
      type: new GraphQLList(mailType),
      async resolve(_, args, context) {
        console.log(context);
        const mail = await Mail.find({});
        return mail;
      }
    }
  }
});

module.exports = queryType;