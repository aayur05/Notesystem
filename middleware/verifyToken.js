// verifyToken.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res) => {
  const { token } = req.body;
  // console.log(token);
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log(verified);
    res.json(verified);
    return true;
  } catch (e) {
    // console.error(e);
    res.json("expired/doesnt exist");
    return false;
  }
};

module.exports = verifyToken;
