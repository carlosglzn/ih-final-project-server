const express = require('express')
const router  = express.Router()
const authController = require('./../controllers/authController')
const auth = require('./../middlewares/auth')

// LOGIN

router.post('/login', authController.loginUser)

// CHECK SESSION

router.get('/', auth, authController.verifyingToken)

module.exports = router