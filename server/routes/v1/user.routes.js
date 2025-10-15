// routes/v1/user.routes.js
const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require("@/controllers/user.controller");

const { isSelf } = require("@/middlewares/isSelf.middleware");
const { isAdmin } = require("@/middlewares/isAdmin.middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", isAdmin, getAllUsers);
router.get("/:id", isSelf, getUserById);
router.put("/:id", isSelf, updateUser);
router.delete("/:id", isSelf, deleteUser);

module.exports = router;
