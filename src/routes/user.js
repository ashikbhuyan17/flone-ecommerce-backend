const express = require('express');
const router = express.Router();
const { signup, signIn } = require('../controller/auth')
const { validateSignupRequest, validateSignInRequest, isRequestValidated } = require('../validators/auth');
const { requireSignIn } = require('../common-middleware');


router.post('/login', validateSignInRequest, isRequestValidated, signIn)

router.post('/register', validateSignupRequest, isRequestValidated, signup)

router.post('/profile', requireSignIn, (req, res) => {
    res.status(200).json({
        user: 'profile'
    })
})


router.get('/', (req, res) => {
    res.send('this is auth page')
})


module.exports = router;