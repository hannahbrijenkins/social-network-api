const { Thought, User } = require('../models');

const thoughtController =  {
    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path:'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(500).json(err));
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought was found by this Id, sorry! '})
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(500).json)
    },

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
                res.statis(404).json({ message: 'No users found with this id!' });
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