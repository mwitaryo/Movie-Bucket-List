const { findAll, findById, addSeries, updateSeries, patchSeries, deleteSeries } = require('../controllers/tvSeries')

const router = require('express').Router()

router.get('/', findAll)
router.get('/:id', findById)
router.post('/', addSeries)
router.put('/:id', updateSeries)
router.patch('/:id', patchSeries)
router.delete('/:id', deleteSeries)

module.exports = router