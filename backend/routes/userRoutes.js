const express = require("express");
const router = express.Router();
const {
  addUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", addUser);
router.post("/login", loginUser);
router.get("/user/:id", getUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

// router.route("/").post(addUser);
// router.route("/login").post(loginUser);
// router.route("/user").get(getUser);
// router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;
