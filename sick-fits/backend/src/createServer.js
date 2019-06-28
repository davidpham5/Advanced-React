// Import graphQl yoga server (express server)
// Sits on top of Apollo server
const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation'); // for pushing data
const Query = require('./resolvers/Query'); // for pulling data
const db = require('./db');

// create the graphql yoga server
function createServer () {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Mutation, // file cannot be empty
      Query // file cannot be empty
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  });
}

module.exports = createServer;
