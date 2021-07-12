const router = require('express').Router()
const { findAll } = require('../controllers')
const movieRouter = require('./movie')
const seriesRouter = require('./series')

router.use('/entertainMe', findAll)
router.use('/movie', movieRouter)
router.use('/series', seriesRouter)

module.exports = router