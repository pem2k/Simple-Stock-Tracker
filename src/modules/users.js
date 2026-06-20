import bcrypt from "bcrypt";
import crypto from "crypto";
import { getDB } from "../db/connection.js";
import { ObjectId } from "mongodb";

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

// adding in a few new functions for this module:
// add holdings, remove holdings, and get holdings.
// these should all be pretty simple, just needs the id to target
// the user for the write, and the ticker and date of purchase. Price at purchase date close
// is pulled from npm finance to populate the starting price on the user holdings.
// slightly inaccurate as Im not asking for purchase time, but I think it's fine
// to use closing for this project's mvp.

export async function addHolding(
  userId,
  ticker,
  purchaseDate,
  purchasePrice,
  units,
) {
  const holdingId = crypto.randomUUID();

  return getDB()
    .collection(USERS_COLLECTION)
    .updateOne(
      {
        _id: new ObjectId(userId),
      },
      {
        $push: {
          holdings: {
            holdingId,
            ticker,
            purchaseDate,
            purchasePrice,
            units,
          },
        },
      },
    );
}

export async function removeHolding(userId, holdingId) {
  return getDB()
    .collection(USERS_COLLECTION)
    .updateOne(
      {
        _id: new ObjectId(userId),
      },
      {
        $pull: { holdings: { holdingId } },
      },
    );
}

export async function getAllHoldings(userId) {
  // Had to add the projection key so I wouldn't get back the full user doc,
  // initial attempt resulted in a return with the pw hash. For future reference, storing this
  // on the user might be a bad pattern, maybe instead store a link to their holdings?
  // not sure if it's worth just so I can return a whole document bc this fix was pretty
  // easy
  return getDB()
    .collection(USERS_COLLECTION)
    .findOne({ _id: new ObjectId(userId) }, { projection: { holdings: 1 } });
}
