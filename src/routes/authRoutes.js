import express from "express";
import { createUser, findUserByUsername } from "../modules/users.js";
import bcrypt from "bcrypt";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "username and password are required" });
  }
  // PEER REVIEW: might want a min password length here so weak passwords get
  // rejected before we ever create the account.
  // if (password.length < 8) {
  //   return res
  //     .status(400)
  //     .json({ error: "password must be at least 8 characters" });
  // }
  try {
    const user = await createUser(username, password);

    res.status(201).json({
      username: user.username,
      message: "account created. Please log in.",
    });
  } catch (err) {
    // PEER REVIEW: a taken username is really a 409, not a 500, and dumping the
    // raw `err` into the response shows the client our internals. Could check
    // for that case and keep the message generic otherwise:
    // if (err.message === "Error, username taken") {
    //   return res.status(409).json({ error: "username is already taken" });
    // }
    // console.error("signup failed:", err);
    // return res.status(500).json({ error: "unable to create account" });
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
    // PEER REVIEW: same thing as signup, better to log `err` on the server and
    // send back a plain message instead of putting it in the response.
    // console.error("login failed:", err);
    // return res.status(500).json({ error: "unable to log in" });
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
