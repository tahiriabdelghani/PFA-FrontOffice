const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    // lastName: {
    //     type: String,
    //     required: true
    // },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    },





}, {
    toJSON: {
        transform: function(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User;