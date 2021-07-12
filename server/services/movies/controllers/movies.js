const Movie = require('../models/movie')

module.exports = class Controller {

  static async findAll(req, res, next) {
    try {
      const movies = await Movie.findAll()
      res.status(200).json(movies)
    } catch (error) {
      next(error)
    }
  }

  static async findById(req, res, next) {
    const { id } = req.params
    try {
      const movie = await Movie.findById(id)
      !movie && next({ status: 404, message: "Movie Not Found" })
      res.status(200).json(movie)
    } catch (error) {
      next(error)
    }
  }

  static async addMovie(req, res, next) {
    let input = {}
    for (const key in req.body) {
      //validate data first !!
      input[key] = req.body[key]
    }

    try {
      const newMovie = await Movie.create(input)
      !newMovie && next({ status: 400, message: "Bad Request" })
      res.status(201).json(newMovie)
    } catch (error) {
      next(error)
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
      !updatedMovie && next({ status: 400, message: "Bad Request" })
      res.status(200).json(updatedMovie)
    } catch (error) {
      console.log(error);

      next(error)
    }
  }

  static async patchMovie(req, res, next) {
    const { id } = req.params
    let input = {}
    for (const key in req.body) {
      //validate data first !!
      input[key] = req.body[key]
    }

    try {
      const patchedMovie = await Movie.patch(id, input)
      !patchedMovie && next({ status: 400, message: "Bad Request" })
      res.status(200).json(patchedMovie)
    } catch (error) {
      next(error)
    }
  }

  static async deleteMovie(req, res, next) {
    const { id } = req.params

    try {
      const deleted = await Movie.destroy(id)
      !deleted && next({ status: 404, message: "Movie Not Found" })
      res.status(200).json({ msg: "Movie deleted" })
    } catch (error) {
      next(error)
    }
  }

  static async errorHandling(req, res, next) {
    console.log(req.params)
  }

}
