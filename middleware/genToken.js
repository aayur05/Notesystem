const jwt = require("jsonwebtoken");
require("dotenv").config();

const genToken = (req, res) => {
  const { userId, role } = req.body;
  const user = { userId, role };
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1H",
  });
  console.log(token);

  res.json(token);
  return token;
};

module.exports = genToken;
