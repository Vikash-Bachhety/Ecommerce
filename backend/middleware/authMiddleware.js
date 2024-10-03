const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const protectedRoute = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token)
    if (!token) {
        return res.status(401).send("Token not found");
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).send("Invalid token");
    }
};

module.exports = protectedRoute;
