const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.jwt_SECRET, {
    expiresIn: "20d",
  });
};

module.exports = generateToken;
