import bcrypt from "bcrypt";
import { getDB } from "../db/connection.js";

const USERS_COLLECTION = "users";
const SALT_ROUNDS = 12;

// find user - mongo id or username, use this to
// check if user exists on login, pull stock data from acc, etc.
// read operation - get

export async function findUserByUsername(username) {
  return getDB().collection(USERS_COLLECTION).findOne({ username });
}

//create user - this is going to be used on the signup route,
//should contain logic that the username provided isn't taken
//writes to mongo db, creating a new user, password hashing also happens here.
// add operation - post
export async function createUser(username, password) {
  const userCheck = await findUserByUsername(username);

  if (userCheck) {
    // this error will bubble to the route where we can return a status code
    // in the catch
    throw new Error("Error, username taken");
  }
  // Hash password here, data flow is user sends password over https:
  // as plain text, it's hashed by bcrypt and I only save the hahs
  // will need to go back through server.js and setup session middle ware to test these once
  // routes are up.
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = await getDB().collection(USERS_COLLECTION).insertOne({
    username,
    hashedPassword,
  });

  return {
    _id: newUser.insertedId,
    username: username,
  };
}
