const { gql } = require('apollo-server')
const fetch = require('node-fetch')
const Redis = require('ioredis')
const redis = new Redis()

const typeDefs = gql`
extend type Query {
  movieById(id: ID!): Movie
  movies: [Movie]
}

type Movie {
  _id: ID
  title: String
  overview: String
  popularity: Float
  tags: [String]
  poster_path: String,
  trailer:String
}

input MovieInput {
  title: String!
  overview:String!
  popularity:Float
  tags:[String]
  poster_path:String
  id:String,
  trailer:String
}

# input InputID {
#   id:ID!
# }

extend type Mutation {
  addMovie(movie:MovieInput):Movie
  updateMovie(movie:MovieInput):Movie
  deleteMovie(id:ID!):Movie
}
`
const url = "http://35.172.235.23:4001"
const resolvers = {
  Query: {
    movieById: async (_, { id }) => {
      try {
        const response = await fetch(`${url}/${id}`)
        const data = await response.json()
        return data[0]
      } catch (error) {
        console.log(error);
      }
    },

    movies: async () => {
      try {
        const moviesCache = await redis.get('movies')
        if (moviesCache) { return JSON.parse(moviesCache) }
        const response = await fetch(url)
        const data = await response.json()
        redis.set('movies', JSON.stringify(data))
        return [data]
      } catch (error) {
        console.log(error);
      }
    }
  },

  Mutation: {
    addMovie: async (_, { movie }) => {
      const { title, overview, popularity, tags, poster_path, trailer } = movie
      const movieData = { title, overview, popularity, tags, poster_path, trailer }
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(movieData),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        const moviesCache = await redis.get('movies')
        const parsedData = JSON.parse(moviesCache)
        const newData = [...parsedData, data.ops[0]]
        redis.set('movies', JSON.stringify(newData))
        return data.ops[0]
      } catch (error) {
        console.log(error);
      }
    },

    updateMovie: async (_, { movie }) => {
      const { id, title, overview, popularity, poster_path, tags, trailer } = movie
      const movieData = { tags, title, overview, popularity, poster_path, id, trailer }

      try {
        const response = await fetch(`${url}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(movieData),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        const moviesCache = await redis.get('movies')
        const parsedData = JSON.parse(moviesCache)
        const newData = parsedData.map(movie => {
          if (movie._id === id) {
            movie = { _id: id, ...data.ops[0] }
          }
          return movie
        })
        redis.set('movies', JSON.stringify(newData))
        return data.ops[0]
      } catch (error) {
        console.log(error);
      }
    },

    deleteMovie: async (_, { id }) => {
      try {
        const response = await fetch(`${url}/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } })
        const data = response.json()
        const moviesCache = await redis.get('movies')
        const parsedData = JSON.parse(moviesCache)
        const newData = parsedData.filter(movie => movie._id !== id)
        redis.set('movies', JSON.stringify(newData))
        return data
      } catch (error) {
        console.log(error);
      }
    }
  }
}

module.exports = {
  typeDefs, resolvers
}