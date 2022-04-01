const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

const thoughtSchema = new Schema(
  {
    // thoughtText
    thoughtText: {
        // String
      type: String,
    //   Required
      required: true,
    //   Must be between 1 and 280 characters
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
        // Date
      type: Date,
    //   Set default value to the current timestamp
      default: Date.now,
    //   Use a getter method to format the timestamp on query
      get: timestamp => moment(timestamp).format('MMM Do YYYY, hh:mm a')
    },
    // username (The user that created this thought)
    username: {
        // String
      type: String,
    //   Required

      required: true
    },
    // reactions (These are like replies)
// Array of nested documents created with the reactionSchema
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
