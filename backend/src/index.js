import { ApolloServer } from "apollo-server-express";

import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginDrainHttpServer,
} from "apollo-server-core";
import mongoose from "mongoose";
import express from "express";
import schema from "./graphql/schema.js";
import http from "http";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const serverStart = async () => {
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

  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    ...schema,
    plugins: [
      ApolloServerPluginLandingPageDisabled(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });
  app.use(express.static("build"));

  await server.start();
  server.applyMiddleware({ app });

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
  });
  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
  );
  console.log(`Server ready`);
};

serverStart();
