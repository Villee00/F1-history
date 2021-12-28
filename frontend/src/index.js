import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import ColorMode from './ColorMode';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
        },
      },
    },
  })
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <ColorMode/>
  </ApolloProvider>,
  document.getElementById('root')
);