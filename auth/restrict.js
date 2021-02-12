const jwt = require("jsonwebtoken");

function restrict(role) {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({
          message: "not authorized",
        });
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err || decoded.userRole !== role) {
          return res.status(401).json({
            message: "not authorized",
          });
        }

        req.token = decoded;

        next();
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;
