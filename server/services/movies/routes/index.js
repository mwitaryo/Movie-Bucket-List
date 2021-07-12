const { findAll, findById, addMovie, updateMovie, patchMovie, deleteMovie, errorHandling } = require('../controllers/movies')

const router = require('express').Router()

router.get('/', findAll)
// router.get('/favicon.ico', errorHandling)
router.get('/:id', findById)
router.post('/', addMovie)
router.put('/:id', updateMovie)
router.patch('/:id', patchMovie)
router.delete('/:id', deleteMovie)

module.exports = router