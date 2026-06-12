import bcrypt from "bcrypt";
import { getDB } from "../db/connection.js";

const USERS_COLLECTION = "users";
const SALT_ROUNDS = 20;

//find user - mongo id or username, use this to
// check if user exists on login, pull stock data from acc, etc.
// read operation - get

//create user - this is going to be used on the signup route,
//should contain logic that the username provided isn't taken
//writes to mongo db, creating a new user, password hashing also happens here.
// add operation - post

//login verification - checks pw hash and username match,
// only returns user id and username.
// m,ay be bad practice but could potentially call alpaca here
// that way the graphs can populate with current prices on login
// I dont necessarily like this idea now that I think about it, would
// require logout/login to refresh price, maybe its something that occurs on refresh?
// maybe the pull happens on graph generation and it's written to cache, if cache is checked first
//we can avoid a ton of alpaca calls, though we should be fine at a 60/call
// a second limit.
// login verification - will be called by a post

export async function findUserByUsername(username) {
  return getDB().collection(USERS_COLLECTION).findOne({ username });
}

export async function findUserByID(_id) {
  return getDB().collection(USERS_COLLECTION).findOne({ _id });
}
