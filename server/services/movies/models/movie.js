const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require('mongodb')


module.exports = class Movie {
  static findAll() {
    return getDatabase().collection('Movies').find().toArray()
  }

  static findById(id) {
    return getDatabase().collection('Movies').find({ _id: ObjectId(id) }).toArray()
  }

  static create(movie) {
    return getDatabase().collection('Movies').insertOne(movie)
  }

  static update(id, movie) {
    return getDatabase().collection('Movies').replaceOne({ _id: ObjectId(id) }, movie)
  }

  static patch(id, movie) {
    return getDatabase().collection('Movies').updateOne({ _id: ObjectId(id) }, { $set: movie })
  }

  static destroy(id) {
    return getDatabase().collection('Movies').deleteOne({ _id: ObjectId(id) })
  }

}

