const Movie = require('../models/movie')

module.exports = class Controller {

  static async findAll(req, res, next) {
    try {
      const movies = await Movie.findAll()
      res.status(200).json(movies)
    } catch (error) {
      console.log(error);
    }
  }

  static async findById(req, res, next) {
    const id = req.params.id
    try {
      const movie = await Movie.findById(id)
      res.status(200).json(movie)
    } catch (error) {
      console.log(error);
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
      res.status(201).json(newMovie)
    } catch (error) {
      console.log(error);
    }
  }

  static async updateMovie(req, res, next) {
    const { id } = req.params
    let input = {}
    for (const key in req.body) {
      //validate data first !!

      input[key] = req.body[key]
    }

    try {
      const updatedMovie = await Movie.update(id, input)
      res.status(200).json(updatedMovie)
    } catch (error) {
      console.log(error);
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
      res.status(200).json(patchedMovie)
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteMovie(req, res, next) {
    const { id } = req.params

    try {
      const deleted = await Movie.destroy(id)
      res.status(200).json({ msg: "Movie deleted" })
    } catch (error) {
      console.log(error);
    }
  }


}