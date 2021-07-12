const router = require('express').Router()
const movieRouter = require('./movie')
const tvSeriesRouter = require('./tvSeries')

router.get('/', (req,res) => {
res.json("welcome")
})
router.use('/movies', movieRouter)
router.use('/series', tvSeriesRouter)

module.exports = router