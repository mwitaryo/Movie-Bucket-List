const { gql } = require('apollo-server')
const fetch = require('node-fetch')
const Redis = require('ioredis')
const redis = new Redis()

const typeDefs = gql`
extend type Query {
  seriesById(id: ID!): Series
  series: [Series]
}

type Series {
  _id: ID!
  title: String!
  overview: String
  popularity: Float
  tags: [String]
  poster_path: String
  trailer:String
}

input SeriesInput {
  id: ID!
  title: String!
  overview: String
  popularity: Float
  tags: [String]
  poster_path: String
  trailer:String
}

extend type Mutation {
  addSeries(series:SeriesInput):Series
  updateSeries(series:SeriesInput):Series
  deleteSeries(id:ID!):Series
}
`

const url = 'http://3.235.49.88:4002'
const resolvers = {
  Query: {
    seriesById: async (_, { id }) => {
      try {
        const response = await fetch(`${url}/${id}`)
        const data = await response.json()
        console.log(data[0]);
        return data[0]
      } catch (error) {
        console.log(error);
      }
    },

    series: async () => {
      try {
        const seriesCache = await redis.get('series')
        if (seriesCache) { return JSON.parse(seriesCache) }
        const response = await fetch(url)
        const data = await response.json()
        redis.set('series', JSON.stringify(data))
        return data
      } catch (error) {
        console.log(error);
      }
    }
  },
  Mutation: {
    addSeries: async (_, { series }) => {
      const { title, overview, popularity, tags, poster_path, trailer } = series
      const input = { title, overview, popularity, tags, poster_path, trailer }
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(input),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        const seriesCache = await redis.get('series')
        const parsedData = JSON.parse(seriesCache)
        const newData = [...parsedData, data.ops[0]]
        redis.set('series', JSON.stringify(newData))
        return data.ops[0]
      } catch (error) {
        console.log(error);
      }
    },

    updateSeries: async (_, { series }) => {
      const { title, overview, popularity, tags, poster_path, id, trailer } = series
      const input = { title, overview, popularity, tags, poster_path, trailer }
      try {
        const response = await fetch(`${url}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(input),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        const seriesCache = await redis.get('series')
        const parsedData = JSON.parse(seriesCache)
        const newData = parsedData.map(series => {
          if (series._id === id) {
            series = { _id: id, ...data.ops[0] }
          }
          return series
        })
        redis.set('series', JSON.stringify(newData))
        return data.ops[0]
      } catch (error) {
        console.log(error);
      }
    },

    deleteSeries: async (_, { id }) => {

      try {
        const response = await fetch(`${url}/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } })
        const data = await response.json()
        const seriesCache = await redis.get('series')
        const parsedData = JSON.parse(seriesCache)
        const newData = parsedData.filter(series => series._id !== id)
        redis.set('series', JSON.stringify(newData))
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