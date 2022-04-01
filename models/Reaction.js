const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    // reactionId
    reactionId: {
        // Use Mongoose's ObjectId data type
      type: Schema.Types.ObjectId,
    //   Default value is set to a new ObjectId
      default: () => new Types.ObjectId()
    },
    // reactionBody
    reactionBody: {
        // String
      type: String,
    //   Required
      required: true,
    //   280 character maximum
      maxlength: 280
    },
    // username
    username: {
        // String
      type: String,
    //   Required
      required: true
    },
    // createdAt


    createdAt: {
        // Date
      type: Date,
    //   Set default value to the current timestamp
      default: Date.now,
    //   Use a getter method to format the timestamp on query
      get: timestamp => moment(timestamp).format('MMM Do YYYY, hh:mm a')
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

module.exports = reactionSchema;
