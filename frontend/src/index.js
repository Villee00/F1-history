import React from 'react';
import { setContext } from "@apollo/client/link/context";
import ReactDOM from 'react-dom';
import './index.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import ColorMode from './ColorMode';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { UserTokenProvider } from './contexts/user';
import { NotificationProvider } from './contexts/alert';

const httpLink = new HttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('f1history-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getDrivers: {
            ...offsetLimitPagination(),
            read(existing, { args: { offset, limit } }) { }
          }
        },
      },
    },
  })
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