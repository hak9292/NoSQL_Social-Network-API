const router = require('express').Router();
const {
    // GET to get all thoughts
    getAllThoughts,
    //   GET to get all thoughts
    getSingleThought,
    //   POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    createThought,
    // PUT to update a thought by its _id
    updateThought,
    // DELETE to remove a thought by its _id
    deleteThought,
    // POST to create a reaction stored in a single thought's reactions array field
    addReaction,
    // DELETE to pull and remove a reaction by the reaction's reactionId value
    removeReaction,
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
