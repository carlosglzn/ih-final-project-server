const User = require('./../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.verifyingToken = async (req, res) => {

    const userId = req.user.id

    try {

        const userFound = await User.findById(userId).select('-password')

        res.json({
            userFound
        })

    } catch(error) {
        console.log(error)
    }

}

exports.loginUser = async (req, res) => {

    const { email, password } = req.body

    try {

        const foundUser = await User.findOne({email})

        if(!foundUser) {
            return res.status(400).json({
                msg: 'User does not exist'
            })
        }

        // CHECK PASSWORD

        const correctPassword = await bcryptjs.compare(password, foundUser.password)

        if(!correctPassword) {

            return res.status(400).json({
                msg: 'Incorrect Password'
            })

        }

        // GENERATE TOKEN SIGN

        const payload = {
            user: {
                id: foundUser.id
            }
        }

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
        console.log(error)
    }

}