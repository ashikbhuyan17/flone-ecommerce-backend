const jwt = require("jsonwebtoken");
const generateAccessToken = (user) => {
    const access_token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "10h",
            issuer: user.id.toString(),
        }
    );
    return access_token
}

module.exports.generateAccessToken = generateAccessToken