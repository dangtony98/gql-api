require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const isAuth = require('./middleware/auth');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const queryType = require('./types/queryType');
const mutationType = require('./types/mutationType');

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

const schema = new GraphQLSchema({ 
  query: queryType,
  mutation: mutationType
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(isAuth);
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});