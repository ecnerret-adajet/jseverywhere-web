// index.js
// This is the main entry point of our application
import React from 'react';
import ReactDom from 'react-dom';

// import Apollo Client libraries
import { ApolloClient, ApolloProvider, InMemoeryCache, InMemoryCache } from '@apollo/client';

// import global styles
import GlobalStyle from '/components/GlobalStyle';

// import routes
import Pages from '/pages';

// configure our API, URI & cache
const uri = process.env.API_URI;
const cache = new InMemoryCache();

// configure Apollo Client
const client = new ApolloClient({
    uri,
    cache,
    connectToDevTools: true
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </ApolloProvider>
    );
};

ReactDom.render(<App />, document.getElementById('root'));
