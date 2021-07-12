const axios = require('axios')



module.exports = class Movie {

  static async findAll() {
    try {
      const movies = await axios({
        method: 'GET',
        url: 'http://localhost:4001'
      })
      return movies.data
    } catch (error) {
      console.log(error)
    }
  }

  static async findById(id) {
    try {
      const movie = await axios({
        method: 'GET',
        url: `http://localhost:4001/${id}`
      })
      return movie.data[0]
    } catch (error) {
      console.log(error);
    }
  }

  static async create(movie) {
    try {
      const newMovie = await axios({
        method: 'POST',
        url: 'http://localhost:4001',
        data: movie,
      })
      return newMovie.data.ops
    } catch (error) {
      console.log(error);
    }
  }

  static async update(id, movie) {
    try {
      const updatedMovie = await axios({
        method: 'PUT',
        url: `http://localhost:4001/${id}`,
        data: movie
      })

      const movieData = { id: updatedMovie.data.ops[0] }
      return movieData
    } catch (error) {
      console.log(error);
    }
  }

  static async destroy(id) {
    try {
      const deletedMovie = await axios({
        method: 'DELETE',
        url: `http://localhost:4001/${id}`
      })
      return deletedMovie.data

    } catch (error) {
      console.log(error);
    }
  }

}