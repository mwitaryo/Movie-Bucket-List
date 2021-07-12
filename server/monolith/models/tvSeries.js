const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require('mongodb')


module.exports = class TvSeries {
  static findAll() {
    return getDatabase().collection('TvSeries').find().toArray()
  }

  static findById(id) {
    return getDatabase().collection('TvSeries').find({ _id: ObjectId(id) }).toArray()
  }

  static create(series) {
    return getDatabase().collection('TvSeries').insertOne(series)
  }

  static update(id, series) {
    return getDatabase().collection('TvSeries').replaceOne({ _id: ObjectId(id) }, series)
  }

  static patch(id, series) {
    return getDatabase().collection('TvSeries').updateOne({ _id: ObjectId(id) }, { $set: series })
  }

  static destroy(id) {
    return getDatabase().collection('TvSeries').deleteOne({ _id: ObjectId(id) })
  }
}