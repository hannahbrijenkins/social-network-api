const router = require('express').Router();
const {
    addThought,
    removeThought
} = require('../../controllers/thought-controller');

router
.route('/:userId')
.post(addThought);

router
.route('/:UserId/:thoughtId')
.delete(removeThought);

module.exports = router;