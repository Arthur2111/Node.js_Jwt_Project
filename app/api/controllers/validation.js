const jwt = require("jsonwebtoken");

exports.validateUser = (req, res, next) => {
  jwt.verify(
    req.headers["x-access-token"], // where the token is stored
    process.env.Secret_Token,
    function (err, decoded) {
      if (err) {
        res.json({ status: "error", message: err.message, data: null });
      } else {
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    }
  );
};
