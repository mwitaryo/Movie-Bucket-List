const TvSeries = require('../models/tvSeries')

module.exports = class Controller {

  static async findAll(req, res, next) {

    try {
      const tvSeries = await TvSeries.findAll()
      res.status(200).json(tvSeries)
    } catch (error) {
      console.log(error);
    }
  }

  static async findById(req, res, next) {
    const id = req.params.id
    try {
      const tvSeries = await TvSeries.findById(id)
      res.status(200).json(tvSeries)
    } catch (error) {
      console.log(error)
    }
  }

  static async addSeries(req, res, next) {
    let input = {}
    for (const key in req.body) {
      //!!! validate first
      input[key] = req.body[key]
    }

    try {
      const newSeries = await TvSeries.create(input)
      res.status(201).json(newSeries)
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
      const updatedSeries = await TvSeries.update(id, input)
      res.status(200).json(updatedSeries)
    } catch (error) {
      console.log(error);
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
      res.status(200).json(patchedSeries)

    } catch (error) {
      console.log(error);
    }
  }

  static async deleteSeries(req, res, next) {
    const { id } = req.params
    try {
      const deleted = await TvSeries.destroy(id)
      console.log(deleted);
      res.status(200).json({ msg: 'Series Deleted' })
    } catch (error) {
      console.log(error);
    }
  }
}