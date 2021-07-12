const { findAll, findById, addMovie, updateMovie, patchMovie, deleteMovie } = require('../controllers/movies')

const router = require('express').Router()

router.get('/', findAll)
router.get('/:id', findById)
router.post('/', addMovie)
router.put('/:id', updateMovie)
router.patch('/:id', patchMovie)
router.delete('/:id', deleteMovie)

module.exports = router