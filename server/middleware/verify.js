const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const authnHeader = req.headers.authorization;
  if (authnHeader) {
    const token = authnHeader.split(" ")[1];
    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(401).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authorized to access this");
  }
};

module.exports = verify;
