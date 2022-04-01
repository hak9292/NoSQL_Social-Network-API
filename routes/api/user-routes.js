const router = require('express').Router();
const {
    // GET all users
    getAllUsers,
    //   GET a single user by its _id and populated thought and friend data
    getSingleUser,
    //   POST a new user:
    createUser,
    //   PUT to update a user by its _id
    updateUser,
    //   DELETE to remove user by its _id
    deleteUser,
    //   POST to add a new friend to a user's friend list
    addFriend,
    //   DELETE to remove a friend from a user's friend list
    removeFriend,
} = require('../../controllers/user-controller');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
