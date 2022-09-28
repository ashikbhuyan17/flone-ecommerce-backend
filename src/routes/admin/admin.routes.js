const express = require('express');
const router = express.Router();

const { signup, signIn } = require('../../controller/admin/admin.controller');
const { validateSignupRequest, validateSignInRequest, isRequestValidated } = require('../../validators/auth');

router.post('/admin/login', validateSignInRequest, isRequestValidated, signIn)

router.post('/admin/register', validateSignupRequest, isRequestValidated, signup)





module.exports = router;