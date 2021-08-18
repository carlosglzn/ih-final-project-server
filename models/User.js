const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({

    username:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const User = mongoose.model("User", usersSchema)

module.exports = User