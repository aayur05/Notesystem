const {
  getAllUser,
  createUser,
  getUserByID,
  getUserByEmail,
  createUserWithRole,
  getDetailbyId,
  updateUserByID,
  updateUserActiveID,
  deleteUserByID,
  changeUserPassword,
} = require("../controller/user.controler");

const genToken = require("../middleware/genToken");
const verifyToken = require("../middleware/verifyToken");

const hashPassword = require("../middleware/hashPassword.js");
const comparePassword = require("../middleware/comparePassword");

const router = require("express").Router();

router.route("/user").get(getAllUser).post(createUser);
router
  .route("/user/:id")
  .get(getUserByID)
  .put(updateUserByID)
  .delete(deleteUserByID);
router.route("/user/detail/:id").get(getDetailbyId);
router.route("/user/email").post(getUserByEmail);
router.route("/user/create").post(createUserWithRole);
router.route("/user/pass/:id").put(changeUserPassword);
router.route("/user/genToken").post(genToken);
router.route("/user/verifyToken").post(verifyToken);
router.route("/user/hash").post(hashPassword);
router.route("/user/active/:id").put(updateUserActiveID);
router.route("/user/compare").post(comparePassword);

module.exports = router;
