// services/user.service.js
const { User } = require("@/models/index");

const { toSafeUser } = require('@/utils/toSafeUser');
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
const bcrypt = require("bcrypt");

const registerUser = async (data) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const user = await User.create({ ...data, password: hashedPassword });

    console.log("User created successfully:", toSafeUser(user));
    return toSafeUser(user);
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user: " + error.message);
  }
};

const loginUser = async (data) => {
  try {
    const user = await User.findOne({ where: { email: data.email } });
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return toSafeUser(user);
  } catch (error) {
    throw new Error("Error logging in user: " + error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return toSafeUser(user);
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

const updateUser = async (id, data) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.update(data);

    return toSafeUser(user);
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
    return true;
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
