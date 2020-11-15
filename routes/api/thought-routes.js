const router = require('express').Router();
const {
    getAllThought,
    addThought,
    removeThought
} = require('../../controllers/thought-controller');

router
.route('/')
.get(getAllThought);

router
.route('/:userId')
.post(addThought);

router
.route('/:UserId/:thoughtId')
.delete(removeThought);

module.exports = router;