const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require('mongodb')


module.exports = class TvSeries {
  static findAll() {
    return getDatabase().collection('Series').find().toArray()
  }

  static findById(id) {
    return getDatabase().collection('Series').find({ _id: ObjectId(id) }).toArray()
  }

  static create(series) {
    return getDatabase().collection('Series').insertOne(series)
  }

  static update(id, series) {
    return getDatabase().collection('Series').replaceOne({ _id: ObjectId(id) }, series)
  }

  static patch(id, series) {
    return getDatabase().collection('Series').updateOne({ _id: ObjectId(id) }, { $set: series })
  }

  static destroy(id) {
    return getDatabase().collection('Series').deleteOne({ _id: ObjectId(id) })
  }
}