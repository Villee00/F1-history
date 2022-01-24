import React from 'react';
import { setContext } from '@apollo/client/link/context';
import ReactDOM from 'react-dom';
import './index.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import ColorMode from './ColorMode';
import { onError } from '@apollo/client/link/error';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { UserTokenProvider } from './contexts/user';
import { NotificationProvider } from './contexts/alert';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI ?? '/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) => {
      if (message === 'Context creation failed: jwt expired') {
        localStorage.clear();
        console.log(`[GraphQL error]: Message: ${message}`);
        window.location.reload();
      }
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('f1history-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getDrivers: {
            ...offsetLimitPagination(),
            read() {},
          },
        },
      },
    },
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <UserTokenProvider>
      <NotificationProvider>
        <ColorMode />
      </NotificationProvider>
    </UserTokenProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
