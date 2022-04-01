// THEN I am able to successfully create, update, and delete users and thoughts in my database
const User = require('./User');
// WHEN I test API POST and DELETE routes in Insomnia
// THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
const Thought = require('./Thought');
// Reaction: schema only
module.exports = { User, Thought };