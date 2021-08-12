require('dotenv').config();
const {
  ApolloServer,
  gql,
} = require('apollo-server');
const mongoose = require('mongoose');

const Circuite = require('./models/circuite');
const Race = require('./models/race');
const season = require('./models/season');

const typeDefs = gql `
`;
// Provide resolver functions for your schema fields
const resolvers = {};

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to mongodb');
}).catch((error) => {
  console.log(`ERROR: mongodb connenction, ${error}`);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({
  url,
}) => {
  console.log(`Server is running on port ${url}`);
});