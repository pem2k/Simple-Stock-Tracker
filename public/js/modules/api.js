/*
  api.js

  This file is the frontend API helper module

  Instead of writing fetch() in every frontend file,
  we put the fetch logic here and reuse it in other files

  Example:
  auth.js can call loginUser() and signupUser()
  addHolding.js can call addHolding()
*/

/*
  apiRequest is the main helper function.

  endpoint = the backend route we want to call
  options = method, body, headers, etc.
*/
async function apiRequest(endpoint, options = {}) {
  const response = await fetch(endpoint, {
    /*
      credentials: "same origin" helps the browser send session cookies
      to the backend. This matters because the backend uses express session.
    */
    credentials: "same-origin",

    /*
      Default header for sending JSON.
      The ...options.headers allows a specific request to add/override headers
    */
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },

    /*
      This adds method, body, etc. from the function calling apiRequest.
    */
    ...options,
  });

  /*
    Read the JSON response from Express.
    Most of our backend routes send JSON.
  */
  const data = await response.json();

  /*
    If the backend returns an error status like 400, 401, or 500,
    throw an error so the other JS file can catch it.
  */
  if (!response.ok) {
    throw new Error(data.error || data.message || "Request failed.");
  }

  return data;
}

/*
  AUTH HELPERS
  These connect to src/routes/authRoutes.js.
*/

export function signupUser(username, password) {
  return apiRequest("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function loginUser(username, password) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function logoutUser() {
  return apiRequest("/api/auth/logout", {
    method: "POST",
  });
}

/*
  USER HOLDING HELPERS
  These connect to src/routes/userHoldingRoutes.js.
*/

export function addHolding(ticker, purchaseDate, units) {
  return apiRequest("/api/userHoldings/add", {
    method: "POST",
    body: JSON.stringify({ ticker, purchaseDate, units }),
  });
}

export function removeHolding(ticker, purchaseDate) {
  return apiRequest("/api/userHoldings/remove", {
    method: "DELETE",
    body: JSON.stringify({ ticker, purchaseDate }),
  });
}

export function getAllHoldings() {
  return apiRequest("/api/userHoldings/all", {
    method: "GET",
  });
}
