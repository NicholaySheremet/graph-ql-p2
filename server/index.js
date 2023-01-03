require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const connectDB = require('./dao');

const port = process?.env?.PORT || 5000;
const dev = process?.env?.NODE_ENV === 'local-development';
const app = express();

connectDB();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: dev,
}));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server run on ${port}`);
});
