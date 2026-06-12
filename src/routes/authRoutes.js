import express from "express";
import { createUser, findUserByUsername } from "../modules/users.js";
import bcrypt from "bcrypt";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// need to write a middleware for route protection

// routes to write, these are all posts

// sign up

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "username and password are required" });
  }
  try {
    const user = await createUser(username, password);

    res.status(201).json({
      username: user.username,
      message: "account created. Please log in.",
    });
  } catch (err) {
    return res.status(500).json({ error: `Unable to create account, ${err} ` });
  }
});

//login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "username and password are required" });
  }

  try {
    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(401).json({ error: "invalid username or password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatches) {
      return res.status(401).json({ error: "invalid username or password" });
    }

    req.session.user = {
      id: user._id.toString(),
      username: user.username,
    };

    return res.status(200).json({
      message: "logged in",
      user: req.session.user,
    });
  } catch (err) {
    return res.status(500).json({ error: `unable to log in ${err}` });
  }
});

//logout
router.post("/logout", requireAuth, (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "unable to log out" });
    res.clearCookie("connect.sid");
    return res.json({ message: "logged out" });
  });
});

export default router;
