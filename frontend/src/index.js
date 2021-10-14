import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

const client = new ApolloClient({
  uri: 'https://serene-scrubland-10481.herokuapp.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getDrivers: relayStylePagination(),
        },
      },
    },
  })
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root')
);