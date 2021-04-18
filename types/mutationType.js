const { 
  GraphQLString,
  GraphQLObjectType
} = require('graphql');
const userType = require('./userType');
const { register, login } = require('../services/auth');

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
    }
  }
});

module.exports = mutationType;