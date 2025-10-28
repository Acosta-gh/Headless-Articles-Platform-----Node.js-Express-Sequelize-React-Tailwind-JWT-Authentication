const express = require("express");
const router = express.Router();

// ======================================================================
//                        🧑 User Model
// ======================================================================
const { User } = require("../../models/index");

// ======================================================================
//                      🧑 User Controllers
// ======================================================================
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require("@/controllers/user.controller");

// ======================================================================
//            🔐 Authentication & Authorization Middlewares
// ======================================================================
const { authorizeOwner } = require("@/middlewares/authorizeOwner.middleware");
const { isAdmin } = require("@/middlewares/isAdmin.middleware");
const { verifyJWT } = require("@/middlewares/verifyJWT.middleware");
const { genericLimiter } = require("@/middlewares/rateLimit.middleware");

// ======================================================================
//                      🧑 User Routes
// ======================================================================

// Create a new user (registration)
router.post("/register", registerUser);
// User login
router.post("/login", loginUser);
// Get all users (admin only)
router.get("/", isAdmin, getAllUsers);
// Get, update, and delete a specific user by ID (owner only)
router.get(
  "/:id",
  verifyJWT,
  genericLimiter,
  authorizeOwner(async (req) => User.findByPk(req.params.id)),
  getUserById
);
// Update a specific user by ID
router.put(
  "/:id",
  verifyJWT,
  authorizeOwner(async (req) => User.findByPk(req.params.id)),
  updateUser
);
// Delete a specific user by ID
router.delete(
  "/:id",
  verifyJWT,
  authorizeOwner(async (req) => User.findByPk(req.params.id)),
  deleteUser
);

module.exports = router;
