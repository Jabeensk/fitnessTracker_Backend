import { Router } from "express";
import bcrypt from 'bcrypt';
import User from "../models/users.js"; 
import Profile from "../models/Profiles.js";

const router = new Router();
const SALT_ROUNDS = 8;

/**
 * GET /
 * @description returns all users
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * GET /:id
 * @description returns a user by id
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "Resource not found!" });
    else res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * POST /
 * @description creates a new user
 */
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, dateOfBirth } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      dateOfBirth
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * PUT /:id
 * @description updates a user by id
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * DELETE /:id
 * @description deletes a user by id
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.json({ msg: "User deleted", deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
