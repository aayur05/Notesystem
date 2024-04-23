require("dotenv").config();

const SimpleCrypto = require("simple-crypto-js").default;

const hashPassword = (req, res) => {
  const plainPassword = req.body.password;
  const simpleCrypto = new SimpleCrypto(process.env.HASHSECRETKEY);
  const cipherText = simpleCrypto.encrypt(plainPassword);
  console.log(cipherText);
  res.json(cipherText);
};

module.exports = hashPassword;
