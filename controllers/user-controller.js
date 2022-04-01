const { User, Thought } = require('../models');

const errorHandler = (err) => {
    console.log(err);
    res.status(500).json({ message: err.message });
};
const userController = {
    // Get all users
    getAllUsers(req, res) {
        User.find({})
            .then((dbUserData) => {
                res.json(dbUserData);
            })
            .catch((err) => {
                errorHandler(err, res);
            });
    },
    // Get a single user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((userings) => res.json(userings))
            .catch((err) => {
                errorHandler(err, res);
            });
    },
    // Create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((userings) => {
                res.json(userings);
            })
            .catch((err) => {
                errorHandler(err, res);
            });
    },
    // Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            {
                $set: req.body,
            },
            {
                runValidators: true,
                new: true,
            }
        )
        .then((userings) => res.json(userings))
            .catch((err) => {
                errorHandler(err, res);
            });
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then(() => {
                res.json({ message: 'User deleted.' });
            })
            .catch((err) => {
                errorHandler(err, res);
            });
    },
    // Add a friend to friend list
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
            .then((userings) => res.json(userings))
            .catch((err) => {
                errorHandler(err, res);
            });
    },
    // Remove a friend from friend list
    removeFriend(req, res) {
        User.findOneAndUpdate(
            {
                _id: req.params.userId
            },
            {
                $pull:
                {
                    friends: req.params.friendId
                }
            },
            {
                new: true
            })
            .then((userings) => res.json(userings))
            .catch((err) => {
                errorHandler(err, res);
            });
    },
};

module.exports = userController;
