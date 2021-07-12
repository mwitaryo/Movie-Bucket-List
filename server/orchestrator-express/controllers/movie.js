const Movie = require('../models/movie')
const Redis = require('ioredis')
const redis = new Redis()


module.exports = class Controller {
  static async findAll(req, res, next) {

    try {
      const moviesCache = await redis.get('movies')
      if (moviesCache) { res.status(200).json(JSON.parse(moviesCache)) }
      else {
        const movieData = await Movie.findAll()
        redis.set('movies', JSON.stringify(movieData))
        res.status(200).json(movieData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  static async findById(req, res, next) {
    const { id } = req.params
    try {
      const moviesCache = await redis.get('movies')
      const selectedMovie = moviesCache ? JSON.parse(moviesCache).find(movie => movie._id === id) : null
      if (!selectedMovie) {
        // change -------------
        const movieData = await Movie.findById(id)
        const newData = [...JSON.parse(moviesCache), movieData]
        redis.set('movies', JSON.stringify(newData))
      } else {
        res.status(200).json(selectedMovie)
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async addMovie(req, res, next) {
    let input = {}
    for (const key in req.body) {
      input[key] = req.body[key]
    }

    try {
      const newMovie = await Movie.create(input)
      // redis.del('movies') --------------------
      const moviesCache = await redis.get('movies')
      const parsedData = JSON.parse(moviesCache)

      const newData = [...parsedData, ...newMovie]
      redis.set('movies', JSON.stringify(newData))
      delete newMovie._id
      res.status(201).json(newMovie) // remove id key !!

    } catch (error) {
      console.log(error);
    }
  }

  static async updateMovie(req, res, next) {
    const { id } = req.params
    let input = {}
    for (const key in req.body) {
      input[key] = req.body[key]
    }
    try {
      const updatedMovie = await Movie.update(id, input)
      //SET REDIS --- checkkk
      const moviesCache = await redis.get('movies')
      const parsedData = JSON.parse(moviesCache)
      const newData = parsedData.map(movie => {
        if (movie._id === id) {
          movie = { _id: id, ...updatedMovie.id }
        }
        return movie
      })

      await redis.set('movies', JSON.stringify(newData))
      res.status(200).json(updatedMovie)
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteMovie(req, res, next) {
    const { id } = req.params
    try {
      const deletedMovie = await Movie.destroy(id)
      //update redis ---- change to set
      const moviesCache = await redis.get('movies')
      const parsedData = JSON.parse(moviesCache)
      const newData = parsedData.filter(movie => movie._id !== id)
      await redis.set('movies', JSON.stringify(newData))
      res.status(200).json(deletedMovie)
    } catch (error) {
      console.log(error);
    }

  }

}