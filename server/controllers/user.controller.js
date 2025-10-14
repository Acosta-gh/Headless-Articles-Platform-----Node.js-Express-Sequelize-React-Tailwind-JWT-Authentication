const userService = require('@/services/user.service');

async function registerUser(req, res) {
  const user = await userService.registerUser(req.body);
  return res.status(201).json(user);
}

async function loginUser(req, res) {
  const user = await userService.loginUser(req.body);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  return res.status(200).json(user);
}

async function getAllUsers(req, res) {
  const users = await userService.getAllUsers();
  return res.status(200).json(users);
}

async function getUserById(req, res) {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.status(200).json(user);
}

async function updateUser(req, res) {
  const user = await userService.updateUser(req.params.id, req.body);
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.status(200).json(user);
}

async function deleteUser(req, res) {
  const deleted = await userService.deleteUser(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'User not found' });
  return res.status(204).send();    
}

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};