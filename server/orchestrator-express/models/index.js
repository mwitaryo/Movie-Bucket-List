const axios = require('axios')

module.exports = class EntertainMe {
  static async findAll() {
    try {
      const moviesData = axios('http://localhost:4001')
      const seriesData = axios('http://localhost:4002')
      const results = await Promise.all([moviesData, seriesData])
      const [movies, series] = results
      return { movies: movies.data, tvSeries: series.data }
    } catch (error) {
      console.log(error);
    }
  }
}
