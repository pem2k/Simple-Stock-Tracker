import express from "express";
import { createUser /*findSafeUserByUsername*/ } from "../modules/users.js";
//import bcrypt from "bcrypt";

const router = express.Router();

// need to write a middleware for route protection

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

// routes to write, these are all posts

// sign up

//login

//logout

export default router;
