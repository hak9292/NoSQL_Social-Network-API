const { Schema, model } = require('mongoose');

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
// User:

// username

// String
// Unique
// Required
// Trimmed
// email

// String
// Required
// Unique
// Must match a valid email address (look into Mongoose's matching validation)
// thoughts

// Array of _id values referencing the Thought model
// friends

// Array of _id values referencing the User model (self-reference)
// Schema Settings:

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
const userSchema = new Schema(
    {
        // username
        username: {
            // String
            type: String,
            // Unique
            unique: true,
            // Required
            required: true,
            // Trimmed
            trim: true,
        },
        // email
        email: {
            // String
            type: String,
            // Required
            required: true,
            // Unique
            unique: true,
            // Must match a valid email address (look into Mongoose's matching validation)
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        // thoughts
        thoughts: [
            // Array of _id values referencing the Thought model
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        // friends
        friends: [
            // Array of _id values referencing the User model (self-reference)
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

const User = model('User', userSchema);

module.exports = User;
