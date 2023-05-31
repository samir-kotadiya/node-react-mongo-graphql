import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

console.log(API_BASE_URL)
// create apollo client
const client = new ApolloClient({
  uri: `${API_BASE_URL}/graphql`,
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ApolloProvider client={client}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </ApolloProvider>
  </React.StrictMode> 
);
