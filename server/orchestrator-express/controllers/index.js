const EntertainMe = require('../models')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = class Controller {
  static async findAll(req, res, next) {
    try {
      const entertainMeCache = await redis.get('entertainMe')
      if (entertainMeCache) { res.status(200).json(JSON.parse(entertainMeCache)) }
      else {
        const results = await EntertainMe.findAll()
        redis.set('entertainMe', JSON.stringify(results))
        res.status(200).json(results)
      }

    } catch (error) {
      console.log(error);
    }
  }
}

