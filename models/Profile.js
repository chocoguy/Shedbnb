const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    desc: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    lang: {
        type: [String]
    },
    website: {
        type: String
    },
    badges: {
        type: [String]
    }
})

module.exports = Profile = mongoose.model('profile', profileSchema);