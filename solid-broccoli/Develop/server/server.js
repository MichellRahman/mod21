const {authMiddleware} = require('./utils/auth')
const {typeDefs, resolvers} = require ('./schemas')
const {ApolloServer} = require('apollo-server-express');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config()
const db = require('./config/connection');
const connectDB = require('./config/connection');
const routes = require('./routes');

connectDB()
const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs, 
  resolvers,
  context: authMiddleware,
  introspection: true,
  persistQueries: false
})
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
const startServer = async (typeDefs, resolvers) => {
  await server.start()
  server.applyMiddleware({app})
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`)
    console.log(`use graphql at http://localhost:${PORT}${server.graphqlPath}`);
  })
}
//app.use(routes);

 startServer()

