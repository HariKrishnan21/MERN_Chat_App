const express = require("express");
const {
  registerUser,
  authUser,
  getAllUsers,
  userSearch,
} = require("../controllers/userController");
const { protect } = require("../Middlewares/AuthMiddleware");
const router = express.Router();
router.route("/search").post(userSearch);
router.route("/allUsers/:id").get(getAllUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
module.exports = router;
