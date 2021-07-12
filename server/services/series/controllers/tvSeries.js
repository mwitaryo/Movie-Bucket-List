const TvSeries = require('../models/tvSeries')

module.exports = class Controller {

  static async findAll(req, res, next) {
    try {
      const tvSeries = await TvSeries.findAll()
      res.status(200).json(tvSeries)
    } catch (error) {
      next(error)
    }
  }

  static async findById(req, res, next) {
    const id = req.params.id
    try {
      const tvSeries = await TvSeries.findById(id)
      !tvSeries && next({ status: 404, message: "Series Not Found" })
      res.status(200).json(tvSeries)
    } catch (error) {
      next(error)
    }
  }

  static async addSeries(req, res, next) {
    let input = {}
    for (const key in req.body) {
      input[key] = req.body[key]
    }

    try {
      const newSeries = await TvSeries.create(input)
      !newSeries && next({ status: 400, message: "Bad Request" })
      res.status(201).json(newSeries)
    } catch (error) {
      next(error)
    }
  }

  static async updateSeries(req, res, next) {
    const { id } = req.params
    let input = {}
    for (const key in req.body) {
      input[key] = req.body[key]
    }

    try {
      const updatedSeries = await TvSeries.update(id, input)
      !updatedSeries && next({ status: 400, message: "Bad Request" })
      res.status(200).json(updatedSeries)
    } catch (error) {
      next(error)
    }
  }

  static async patchSeries(req, res, next) {
    const { id } = req.params
    let input = {}
    for (const key in req.body) {
      input[key] = req.body[key]
    }

    try {
      const patchedSeries = await TvSeries.patch(id, input)
      !patchedSeries && next({ status: 400, message: "Bad Request" })
      res.status(200).json(patchedSeries)
    } catch (error) {
      next(error)
    }
  }

  static async deleteSeries(req, res, next) {
    const { id } = req.params

    try {
      const deleted = await TvSeries.destroy(id)
      !deleted && next({ status: 404, message: "TV Series Not Found" })
      res.status(200).json({ msg: 'Series Deleted' })
    } catch (error) {
      next(error)
    }
  }
}