const Series = require('../models/series')
const Redis = require('ioredis')
const redis = new Redis()


module.exports = class Controller {
  static async findAll(req, res, next) {

    try {
      const seriesCache = await redis.get('series')
      if (seriesCache) { res.status(200).json(JSON.parse(seriesCache)) }
      else {
        const seriesData = await Series.findAll()
        redis.set('series', JSON.stringify(seriesData))
        res.status(200).json(seriesData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  static async findById(req, res, next) {
    const { id } = req.params
    try {
      const seriesCache = await redis.get('series')
      const selectedSeries = seriesCache ? JSON.parse(seriesCache).find(series => series._id === id) : null
      if (!selectedSeries) {
        // change -------------
        // const seriesData = await series.findById(id)
        const newData = [...JSON.parse(seriesCache), seriesData]
        redis.set('series', JSON.stringify(newData))
      } else {
        res.status(200).json(selectedSeries)
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async addSeries(req, res, next) {
    let input = {}
    for (const key in req.body) {
      input[key] = req.body[key]
    }

    try {
      const newSeries = await Series.create(input)
      // redis.del('series') --------------------
      const seriesCache = await redis.get('series')
      const parsedData = JSON.parse(seriesCache)
      const newData = [...parsedData, ...newSeries]
      redis.set('series', JSON.stringify(newData))
      delete newSeries._id
      res.status(201).json(newSeries) // remove id key !!!!!!-----------

    } catch (error) {
      console.log(error);
    }
  }

  static async updateSeries(req, res, next) {
    const { id } = req.params
    let input = {}
    for (const key in req.body) {
      input[key] = req.body[key]
    }
    try {
      const updatedSeries = await Series.update(id, input)
      //SET REDIS ---------- checkk
      const seriesCache = await redis.get('series')
      const parsedData = JSON.parse(seriesCache)
      const newData = parsedData.map(series => {
        if (series._id === id) {
          series = { _id: id, ...updatedSeries.id }
        }
        return series
      })
      await redis.set('series', JSON.stringify(newData))
      res.status(200).json(updatedSeries)
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteSeries(req, res, next) {
    const { id } = req.params
    try {
      const deletedSeries = await Series.destroy(id)
      //update redis
      const seriesCache = await redis.get('series')
      const parsedData = JSON.parse(seriesCache)
      const newData = parsedData.filter(series => series._id !== id)
      redis.set('series', JSON.stringify(newData))
      res.status(200).json(deletedSeries)
    } catch (error) {
      console.log(error);
    }

  }

}