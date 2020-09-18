const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        default: ''
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);