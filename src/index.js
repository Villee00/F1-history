import { ApolloServer, gql } from "apollo-server";

import mongoose from "mongoose";
import schema from "./graphql/schema.js";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.log(`ERROR: mongodb connenction, ${error}`);
  });

const server = new ApolloServer(schema);

server.listen().then(({ url }) => {
  console.log(`Server is running on port ${url}`);
});
