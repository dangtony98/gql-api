const { 
  GraphQLString,
  GraphQLObjectType
} = require('graphql');

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { 
      type: GraphQLString,
      resolve (parent, args, context, info) {
        return parent.id || parent._id;
      } 
    },
    username: { type: GraphQLString },
    token: { type: GraphQLString }
  }
});

module.exports = userType;