// index.js
// This is the main entry point of our application
import React from 'react';
import ReactDom from 'react-dom';

// import Apollo Client libraries
import { ApolloClient,
        ApolloProvider,
        createHttpLink,
        InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';

// import global styles
import GlobalStyle from '/components/GlobalStyle';

// import routes
import Pages from '/pages';

const uri = process.env.API_URI;

// configure our API, URI & cache
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

// check for a token and return the header to the context
const authLink = setContext((_,{headers}) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    };
});

// configure Apollo Client
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    // uri,
    cache,
    resolvers: {},
    connectToDevTools: true
});

// check for a local token
const data = {
    isLoggedIn: !!localStorage.getItem('token')
};

// write the cache data on initial loads
cache.writeData({data});
// write the cache data after cache is reset
client.onResetStore(() => cache.writeData({data}))

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </ApolloProvider>
    );
};

ReactDom.render(<App />, document.getElementById('root'));
