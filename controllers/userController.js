const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {

    // VALIDATIONS

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({
            msg: errors.array()
        })
    }

    const { username, email, password } = req.body

    try {
        
        const salt = await bcryptjs.genSalt(10)

        const hashedPassword = await bcryptjs.hash(password, salt)

        const responseDB = await User.create({
            username,
            email,
            password: hashedPassword
        })

        // CREATE JWT

        const payload = {
            user: {
                id: responseDB._id
            }
        }

        // SIGN JWT

        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 360000
            },
            (error, token) => {
                if(error) throw error

                res.json({
                    token
                })

            }
        )
 

    } catch(error) {

        return res.status(400).json({
            msg: error
        })
    }

}