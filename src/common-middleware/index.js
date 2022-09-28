
const jwt = require('jsonwebtoken');

exports.requireSignIn = (req, res, next) => {
    // console.log(req.headers.authorization);
    if (!req.headers.authorization) {
        return res.status(400).json({ message: "Unauthenticated" });
    } else {

        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            const user = jwt.verify(token, process.env.JWT_SECRET)
            req.user = user;
        } else {
            return res.status(400).json({ message: "Authenticate Required" });

        }
    }
    next()
}

exports.userMiddleware = (req, res, next) => {
    console.log("user", req.user);
    if (req.user.role !== 'user') {
        return res.status(400).json({ message: "User Access Denied" });
    }
    next()
}



exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).json({ message: "Admin Access Denied" });
    }
    next()
}


