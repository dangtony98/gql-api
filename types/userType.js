const { 
  GraphQLString,
  GraphQLObjectType
} = require('graphql');

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    token: { type: GraphQLString }
  }
});

module.exports = userType;