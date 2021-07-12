const axios = require('axios')

module.exports = class Series {

  static async findAll() {
    try {
      const seriesList = await axios({
        method: 'GET',
        url: 'http://localhost:4002'
      })
      return seriesList.data
    } catch (error) {
      console.log(error)
    }
  }

  static async findById(id) {
    try {
      const series = await axios({
        method: 'GET',
        url: `http://localhost:4002/${id}`
      })
      return series.data[0]
    } catch (error) {
      console.log(error);
    }
  }

  static async create(series) {
    try {
      const newSeries = await axios({
        method: 'POST',
        url: 'http://localhost:4002',
        data: series,
      })
      return newSeries.data.ops
    } catch (error) {
      console.log(error);
    }
  }

  static async update(id, series) {
    try {
      const updatedSeries = await axios({
        method: 'PUT',
        url: `http://localhost:4002/${id}`,
        data: series
      })
      const seriesData = updatedSeries.data.ops[0]
      return seriesData
    } catch (error) {
      console.log(error);
    }
  }

  static async destroy(id) {
    try {
      const deletedSeries = await axios({
        method: 'DELETE',
        url: `http://localhost:4002/${id}`
      })
      return deletedSeries.data

    } catch (error) {
      console.log(error);
    }
  }

}