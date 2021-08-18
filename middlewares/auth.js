const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {

    const token = req.header('x-auth-token')

    if(!token) {
        return res.status(401).json({
            msg: 'No token, Invalid permit'
        })
    }

    try {

        const openToken = await jwt.verify(token, process.env.SECRET)

        req.user = openToken.user

        next()


    } catch(error) {
        console.log(error)
    }

}