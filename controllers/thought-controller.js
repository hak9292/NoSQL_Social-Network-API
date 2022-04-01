const { Thought, User } = require('../models');

const errorHandler = (err, res) => {
    console.log(err);
    res.status(500).json({ message: err.message });
};

const thoughtController = {
    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((thinkings) => {
                res.json(thinkings);
            })
            .catch((err) => {
                errorHandler(err, res)
            });
    },
    // Get single thought by :id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thinkings) => res.json(thinkings))
            .catch((err) => {
                errorHandler(err, res);
            });
    },
    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thinkings) => {
                return User.findOneAndUpdate(
                    {
                        _id: req.body.userId
                    },
                    {
                        $push: {
                            thoughts: thinkings._id
                        }
                    },
                    {
                        new: true
                    }
                );
            })
            .then((thinkings) => res.json(thinkings))
            .catch((err) => {
                errorHandler(err, res);
            });
    },
    // Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate({
            _id: req.params.thoughtId
        },
            {
                $set: req.body
            },
            {
                runValidators: true,
                new: true
            })
            .then((thinkings) => res.json(thinkings))
            .catch((err) => {
                errorHandler(err, res);
            });
    },
    // Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thinkings) => {
                return User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                );
            })
            .then((thinkings) => res.json(thinkings))
            .catch((err) => {
                errorHandler(err, res);
            });
    },

    // Add reaction to a thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thinkings) => res.json(thinkings))
            .catch((err) => {
                errorHandler(err, res);
            });
    },
    // Remove reaction from a thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thinkings) => res.json(thinkings))
            .catch((err) => {
                errorHandler(err, res);
            });
    },
};

module.exports = thoughtController;
