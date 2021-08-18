const express   = require('express')
const router    = express.Router()
const { check } = require('express-validator')
const userController = require('./../controllers/userController')

router.post('/create', 
    [
        check('username', 'username is required').not().isEmpty(),
        check('email', 'Add a valid email').isEmail(),
        check('password', 'The pasword must be at least 6 characters long.').isLength({min: 6})
    ],
    userController.createUser)

module.exports = router