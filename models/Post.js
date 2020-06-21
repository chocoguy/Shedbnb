const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
     user: {
         type: Schema.Types.ObjectId,
         ref: 'users'
     },
     shed: {
         type: String,
         required: true
     },
     location: {
         type: String,
         required: true
     },
     picture: {
         type: String,
         required: true
     },
     amenity: {
         type: String,
     },
     name: {
         type: String
     },
    avatar: {
        type: String
    },
     text: {
         type: String,
         required: true
     },
     email: {
         type: String,
         required: true
     },
     date: {
         type: Date,
         default: Date.now
     }
});

module.exports = Post = mongoose.model('posts', PostSchema)