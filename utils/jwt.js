const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator() {
  const payload = {
    user: user_id,
    role: role,
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });
}

module.exports = jwtGenerator;
