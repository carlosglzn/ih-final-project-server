const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({

    username:{
        type: String,
        required: true
    },
    email: {
        type: String
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