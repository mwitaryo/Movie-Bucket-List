const { findAll, findById, addSeries, updateSeries, deleteSeries } = require('../controllers/series')

const router = require('express').Router()

router.get('/', findAll)
router.get('/:id', findById)
router.post('/', addSeries)
router.put('/:id', updateSeries)
router.delete('/:id', deleteSeries)

module.exports = router