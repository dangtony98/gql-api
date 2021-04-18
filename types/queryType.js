const { 
  GraphQLString,
  GraphQLObjectType,
  GraphQLList
} = require('graphql');
const userType = require('./userType');
const User = require('../models/user');

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
    }
  }
});

module.exports = queryType;