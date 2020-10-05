const { Thought, User } = require('../models');

const thoughtController =  {
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                { _id: params.username },
                { $push: { thoughts: _id } },
                { new: true}
            );
        })
        .then(dbUsers => {
            if (!dbUsers) {
                res.statis(404).json({ message: 'No pizza found with this id!' });
                return;
            }
            res.json(dbUsers);
        })
        .catch(err => res.json(err));
    },

    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deleteThought => {
            if (!deletedComment) {
                return res.status(404).json({ message: 'No comment with this id!' });
        }
        return User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { comments: params.commentId } },
            { new: true }
        );
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id! '});
            return;
        }
    res.json(dbUserData);
    })
    .catch(err => res.json(err));
}};

module.exports = thoughtController;