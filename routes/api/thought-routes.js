const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    addThought,
    removeThought,
    editThought,
    addReaction
} = require('../../controllers/thought-controller');

router
.route('/')
.get(getAllThought);

router
.route('/:id')
.get(getThoughtById)

router
.route('/:userId')
.post(addThought);

router
.route('/:UserId/:thoughtId')
.delete(removeThought);

router
.route('/:thoughtId')
.put(editThought);

router
.route('/:thoughtId/reactions')
.post(addReaction)

module.exports = router;