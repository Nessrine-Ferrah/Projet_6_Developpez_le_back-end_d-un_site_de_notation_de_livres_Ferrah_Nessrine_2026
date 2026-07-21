const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log("AUTH MIDDLEWARE TRIGGERED");
    console.log("HEADERS:", req.headers);
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log("TOKEN RECEIVED:", token);

    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
     console.log("DECODED TOKEN:", decodedToken);

    req.auth = { userId: decodedToken.userId };
    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);
    res.status(401).json({ error });
  }
};