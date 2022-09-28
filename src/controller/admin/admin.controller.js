const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../../service/user.service');

exports.signup = (req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) {
                return res.status(400).json({ message: 'Admin already registered' });
            }
            const { firstName, lastName, email, username, password } = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username,
                role: 'admin'
            })
            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({ message: "something went wrong" })
                }
                if (data) {
                    const admin = {
                        _id: data._id,
                        fullName: data.fullName,
                        email: data.email,
                        role: data.role
                    }
                    return res.status(201).json({
                        message: 'admin created successfully',
                        admin
                    })
                }
            })
        })
}

exports.signIn = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }
            if (user) {
                if (user.authenticate(req.body.password) && user.role === 'admin') {
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
                    return res.status(400).json({ message: "password does not match" });
                }

            } else {
                return res.status(400).json({ message: "something went wrong" });
            }

        })
}


// exports.requireSignIn = (req, res, next) => {
//     console.log(req.headers);
//     const token = req.headers.authorization.split(" ")[1];
//     console.log(token);
//     const user = jwt.verify(token, process.env.JWT_SECRET)
//     req.user = user;
//     next()
// }



// module.exports = { signIn, requireSignIn, signup }