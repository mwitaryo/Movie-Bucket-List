import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: `http://18.208.119.243:4000`,
  cache: new InMemoryCache(),


})

export default client