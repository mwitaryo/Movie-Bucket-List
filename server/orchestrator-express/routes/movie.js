const { findAll, findById, updateMovie, addMovie, deleteMovie } = require('../controllers/movie')

const router = require('express').Router()

router.get('/', findAll)
router.get('/:id', findById)
router.put('/:id',updateMovie)
router.post('/', addMovie)
router.delete('/:id',deleteMovie)


module.exports = router