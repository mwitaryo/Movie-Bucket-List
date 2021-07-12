const { ApolloServer } = require('apollo-server')


const server = new ApolloServer({
  modules: [
    require('./modules/movie'),
    require('./modules/series')
  ]
})


server.listen().then(({ url }) => console.log(`server running at ${url}`))