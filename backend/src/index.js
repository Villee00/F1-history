import { ApolloServer } from 'apollo-server-express';

import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginDrainHttpServer,
} from 'apollo-server-core';
import mongoose from 'mongoose';
import express from 'express';
import schema from './graphql/schema.js';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import User from './models/user';
import jwt from 'jsonwebtoken';
dotenv.config();

const serverStart = async () => {
  mongoose
    .connect(
      process.env.NODE_ENV !== 'test'
        ? process.env.MONGO_URI
        : process.env.MONGO_TEST_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log('Connected to mongodb');
    })
    .catch((error) => {
      console.log(`ERROR: mongodb connenction, ${error}`);
    });

  const app = express();
  const httpServer = http.createServer(app);
  let server;
  if (process.env.NODE_ENV == 'production') {
    app.use(express.static('build'));
    server = new ApolloServer({
      ...schema,
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          );
          const currentUser = await User.findById(decodedToken.id)
            .populate({
              path: 'favorites.races',
              model: 'Race',
            })
            .populate({
              path: 'favorites.drivers',
              model: 'Driver',
            });
          return {
            currentUser,
          };
        }
      },
      plugins: [
        ApolloServerPluginLandingPageDisabled(),
        ApolloServerPluginDrainHttpServer({
          httpServer,
        }),
      ],
    });
    await server.start();
    server.applyMiddleware({
      app,
    });
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
    });
  } else {
    server = new ApolloServer({
      ...schema,
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          );
          const currentUser = await User.findById(decodedToken.id)
            .populate({
              path: 'favorites.races',
              model: 'Race',
            })
            .populate({
              path: 'favorites.drivers',
              model: 'Driver',
            });
          return {
            currentUser,
          };
        }
      },
      plugins: [
        ApolloServerPluginDrainHttpServer({
          httpServer,
        }),
      ],
    });
    await server.start();
    server.applyMiddleware({
      app,
    });
  }

  await new Promise((resolve) =>
    httpServer.listen(
      {
        port: process.env.PORT || 4000,
      },
      resolve
    )
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

serverStart();
