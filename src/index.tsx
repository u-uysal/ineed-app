import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
// import { BrowserRouter } from 'react-router-dom'
// import { AuthProvider } from './context/authContext'
import App from './App'




// Our React Application needs acces to...
// Client
// Authorization Context
// Browser Router (React Router) /register

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS>
        <App />
        </ChakraProvider>
      </ApolloProvider>
  </React.StrictMode>
)
