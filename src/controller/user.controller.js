const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../service/user.service')

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const { firstName, lastName, email, password, username } = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username
            })
            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({ message: "something went wrong" })
                }
                if (data) {
                    return res.status(201).json({ user: data })
                }
            })
        })
}

exports.signIn = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) {
                return res.status(400).json({ message: "User not  found" });
            }
            if (user) {
                if (user.authenticate(req.body.password)) {
                    // const token = jwt.sign({ email: user.email, _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
                    const { firstName, lastName, email, role, fullName } = user
                    const token = generateAccessToken(user)
                    res.cookie("access_token", generateAccessToken(user), {
                        httpOnly: true,
                        signed: true,
                    });
                    return res.status(200).json({
                        token,
                        user: {
                            firstName, lastName, email, role, fullName
                        }
                    });

                } else {
                    return res.status(400).json({ error: "Invalid Credentials" });
                }

            } else {
                return res.status(400).json({ message: "something went wrong" });
            }

        })
}

