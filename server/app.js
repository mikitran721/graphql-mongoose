const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

// Load schema & resolvers
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

// load db method
const mongoDataMethods = require("./data/db");

// Connect to MongooseDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mikitran721:tPP2JFOEBgfcP8SH@graphqldb.psmrpmw.mongodb.net/?retryWrites=true&w=majority",
      {
        // useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
      }
    );
    console.log(`MongoDB connected`); //bao cho moi lan ket noi t.cong
  } catch (error) {
    console.log(error.message);
    process.exit(1); //cho app xap nguon
  }
};

connectDB();

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoDataMethods }),
  });
  await server.start();

  server.applyMiddleware({ app });

  app.use((req, res) => {
    res.status(200);
    res.send("Hello");
    res.end();
  });

  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}
startApolloServer();
// apollo server
/* const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}); */
