const SimpleCrypto = require("simple-crypto-js").default;
require("dotenv").config();

const comparePassword = async (req, res) => {
  const { password, checkPassword } = req.body;

  if (!password || !checkPassword) {
    return res
      .status(400)
      .json({ error: "Missing password or checkPassword field" });
  }

  try {
    const simpleCrypto = new SimpleCrypto(process.env.HASHSECRETKEY);
    const ConvertText = simpleCrypto.decrypt(checkPassword);
    console.log(ConvertText);
    console.log(password);
    var isMatch = false;
    if (ConvertText == password) {
      isMatch = true;
    }
    // console.log("isMatch" + isMatch);
    res.json({ isMatch });
  } catch (error) {
    console.error("Error comparing passwords:", error);
    res.status(500).json({ error: "Error comparing passwords" });
  }
};

module.exports = comparePassword;
