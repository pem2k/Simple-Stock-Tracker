# Simple-Stock-Tracker
A full-stack stock portfolio tracking application created for **CS 5610 Web Development**. This project uses **Node.js**, **Express**, **MongoDB**, **HTML5**, **CSS**, **Bootstrap**, and **vanilla JavaScript ES6 modules**.

Users can create an account, log in, add stock holdings, view their portfolio value over time, and remove holdings from their dashboard.

## Project Objective

The goal of this project is to build a simple backend web application using **Node.js + Express + MongoDB** with a frontend built using **HTML5, CSS and vanilla JavaScript**.

The application allows users to track stock holdings by entering a ticker symbol, the number of units purchased, and the purchase date. The backend fetches historical stock prices, calculates portfolio value over time, and returns the calculated data to the frontend.

The dashboard displays each holding as a Bootstrap card and shows the total portfolio value over time using a Chart.js line chart.

## Project Background

The Simple Stock Tracker was designed as a lightweight portfolio tracking app for users who want a simpler alternative to large financial dashboards or manual spreadsheet tracking.

The original project idea was to let users create an account, log in securely, add stock purchases, and view how their portfolio value changes over time. Instead of exposing raw external API data directly to the frontend, the backend performs the calculations and returns only the holding and portfolio values needed by the dashboard.

## Live Website

We need to add - deployed website link here

Example:

placeholder [View the deployed Simple Stock Tracker](TODO_ADD_DEPLOYED_WEBSITE_LINK_HERE)

## Screenshot

We need to add: add screenshot here

Example:

![Simple Stock Tracker Dashboard Screenshot](TODO_ADD_SCREENSHOT_IMAGE_LINK_HERE)

## Video Demonstration

We need to add - Add public narrated video demo link here

Example:

We need to add - [Watch the demo video](TODO_ADD_VIDEO_DEMO_LINK_HERE)

## Class Reference

This project was created for:

**CS 5610 Web Development**

We need to add - class website link here

Example:

[CS 5610 Web Development Class Website](TODO_ADD_CLASS_LINK_HERE)

## Author

**Najib Mosquera and Parker McKillop**

GitHub: [NHazelJ](https://github.com/NHazelJ)
GitHub: [NHazelJ](https://github.com/NHazelJ)

LinkedIn:
LinkedIn: [Najib Mosquera](TODO_ADD_LINKEDIN_LINK_HERE)


## Features

* User signup
* User login
* Password hashing with bcrypt
* Session based authentication
* Add stock holdings using a form
* Remove stock holdings using an X button
* Portfolio dashboard
* Bootstrap cards for each holding
* Portfolio value chart using Chart.js
* Historical stock price lookup
* MongoDB database storage
* Modular backend JavaScript
* Modular frontend JavaScript
* Client-side rendering using vanilla JavaScript
* Environment variables for local configuration
* No Mongoose
* No template engines
* ES modules instead of CommonJS

## User Personas

The app was designed with three example users in mind:

### Marcus — The IT Professional

Marcus works remotely and wants lightweight software that is quick and easy to use. He does not want a complicated finance dashboard with too many extra features. His goal is to log in, check a few personal stock holdings, and quickly understand whether his portfolio is moving up or down.

### Elena — The Graduate Student

Elena is balancing school, budgeting, and early investing. She wants a beginner-friendly way to understand whether her small investments are growing. A simple graph helps her understand her portfolio performance without needing to calculate everything manually.

### David — The Manual Tracker

David has been tracking his stock purchases in a spreadsheet. He wants to move away from manual formulas and use a web app where he can save stock purchases, view performance, and remove holdings when needed.

## User Stories

### User Story 1 — Secure Authentication

As a user, I want to create an account and log in securely, so that my portfolio data is private and separated from other users.

### User Story 2 — Portfolio Management

As a user, I want to enter a stock ticker, purchase date, and number of units, so that the app can save my holding and calculate my portfolio value.

### User Story 3 — Visualizing Performance

As a user, I want to view a line chart of my total portfolio value over time, so that I can quickly understand my investment performance without doing the math myself.

### User Story 4 — Removing Holdings

As a user, I want to remove a stock holding from my dashboard, so that my portfolio stays accurate when I no longer want to track that holding.

## Main User Flow

1. A user opens the app.
2. The user creates an account.
3. The user logs in.
4. The user adds a stock holding by entering:

   * Stock ticker
   * Units purchased
   * Purchase date
5. The app saves the holding in MongoDB.
6. The backend fetches historical prices and calculates portfolio value over time.
7. The dashboard displays:

   * A portfolio value chart
   * A card for each holding
   * Current value and gain/loss
8. The user can remove a holding by clicking the X button on the card.
9. The user can log out.

## Pages

This project includes these main frontend pages:

* `login.html` — Login page for existing users
* `signup.html` — Signup page for new users
* `portfolioDashboard.html` — Main dashboard where users manage holdings and view portfolio value

## Backend Routes

The backend uses Express routes for authentication and stock holdings.

### Authentication Routes

* `POST /api/auth/signup`
* `POST /api/auth/login`
* `POST /api/auth/logout`

### User Holding Routes

* `POST /api/userHoldings/add`
* `GET /api/userHoldings/all`
* `DELETE /api/userHoldings/remove`

## MongoDB Collections

This project uses MongoDB with multiple collections.

### `users`

Stores user account information and portfolio holdings.

Example data stored:

* Username
* Hashed password
* Holding records

### `stockHistory`

Stores cached historical stock price records.

Example data stored:

* Stock ticker
* Date
* Closing price

The stock history collection helps avoid unnecessary repeated external data requests by storing historical price records locally.

## CRUD Operations

This project supports CRUD-style operations through the user and stock tracking features.

### Create

* Users can create an account.
* Users can add stock holdings.
* Historical stock records can be inserted into the stock history collection.

### Read

* Users can log in and read their saved holdings.
* The dashboard reads calculated portfolio history from the backend.
* The app reads cached historical stock data from MongoDB.

### Update

* Historical stock price records can be inserted or updated in the local `stockHistory` collection when stock data is fetched.

### Delete

* Users can remove holdings from their portfolio.

## Portfolio Calculation

The portfolio calculation is handled on the backend.

For each holding, the backend:

1. Reads the user's saved holdings from MongoDB.
2. Fetches historical stock prices for each ticker.
3. Calculates each holding's value using:

```text
units purchased × closing price
```

4. Adds together the value of all holdings for each date.
5. Returns the full portfolio history to the frontend.

The dashboard chart uses the full portfolio value over time, not separate individual stock lines.

## Tech Stack

This project uses:

* HTML5
* CSS3
* Bootstrap 5
* Vanilla JavaScript
* ES6 modules
* Node.js
* Express
* MongoDB native driver
* Docker for local MongoDB
* Chart.js
* yahoo-finance2
* Alpaca API package
* bcrypt
* express-session
* ESLint
* Prettier
* Git and GitHub
* MIT License

## Important Project Restrictions

This project does **not** use:

* Mongoose
* Template engines such as EJS, Pug, Jade, or Handlebars
* CommonJS `require`
* React, Vue, or Angular

The project uses ES modules with `import` and `export`.

## Folder Structure

```text
Simple-Stock-Tracker/
  Docs/
    designdoc.md
    rubric.md

  public/
    css/
      login.css
      signup.css

    js/
      modules/
        addHolding.js
        api.js
        auth.js
        cardBuilder.js
        chartBuilder.js
        logout.js

    pages/
      login.html
      portfolioDashboard.html
      signup.html

  src/
    db/
      connection.js
      stockHistory.js

    middleware/
      authMiddleware.js

    modules/
      alpacaClient.js
      stockData.js
      users.js

    routes/
      authRoutes.js
      userHoldingRoutes.js

  .env
  .gitignore
  eslint.config.js
  example.env
  LICENSE
  package.json
  package-lock.json
  README.md
  server.js
```

## JavaScript Modules

The project uses ES6 modules on both the backend and frontend.

Examples:

* `server.js` starts the Express server and connects the routes.
* `connection.js` handles the MongoDB connection.
* `users.js` handles user and holding database operations.
* `stockHistory.js` handles cached historical stock price records.
* `stockData.js` handles stock price lookup and historical price logic.
* `api.js` centralizes frontend fetch requests.
* `addHolding.js` handles the add holding form.
* `cardBuilder.js` renders holding cards.
* `chartBuilder.js` renders the portfolio value chart.
* `logout.js` handles logout behavior.

## Client-Side Rendering

The frontend uses vanilla JavaScript for client-side rendering.

The dashboard does not use a frontend framework or template engine. Instead, JavaScript fetches data from the Express API and updates the DOM directly.

Examples:

* `cardBuilder.js` fetches holdings and renders Bootstrap cards.
* `chartBuilder.js` fetches portfolio history and renders the Chart.js line chart.

## Forms

This project includes multiple forms:

* Signup form
* Login form
* Add holding form

The add holding form collects:

* Stock ticker
* Units purchased
* Purchase date

## Environment Variables

This project uses environment variables for local configuration.

Create a `.env` file in the root of the project:

```env
MONGO_URI=mongodb://localhost:27017/simple-stock-tracker
MONGO_DB_NAME=simple-stock-tracker
SESSION_SECRET=myLocalSecret123
PORT=3000
```

Do not commit real secret credentials to GitHub.

The `.env` file should stay local and should be listed in `.gitignore`.

An `example.env` file can be used to show other developers what variables they need without exposing private values.

## How to Install and Run Locally

### 1. Clone the repository

```bash
git clone TODO_ADD_REPOSITORY_LINK_HERE
Example:

```bash
git clone https://github.com/pem2k/Simple-Stock-Tracker.git
```

### 2. Move into the project folder

```bash
cd Simple-Stock-Tracker
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start MongoDB with Docker

Make sure Docker Desktop is open and running.

If the MongoDB container already exists, start it with:

```bash
docker start mongodb
```

If the MongoDB container does not exist yet, create it with:

```bash
docker run --name mongodb -p 27017:27017 -d mongo:7
```

### 5. Confirm MongoDB is running

```bash
docker ps
```

You should see a container named:

```text
mongodb
```

### 6. Create the `.env` file

Create a `.env` file in the root folder and add:

```env
MONGO_URI=mongodb://localhost:27017/simple-stock-tracker
MONGO_DB_NAME=simple-stock-tracker
SESSION_SECRET=myLocalSecret123
PORT=3000
```

### 7. Start the app

```bash
npm start
```

### 8. Open the app in the browser

```text
http://localhost:3000
```

## How to Use the App

1. Open the app at `http://localhost:3000`.
2. Create a new account.
3. Log in.
4. On the dashboard, enter:

   * Stock ticker
   * Units purchased
   * Purchase date
5. Click **Add Holding**.
6. View the holding card under **Your Holdings**.
7. View the portfolio value chart.
8. Click the X button on a card to remove a holding.
9. Click **Logout** when finished.

## Example Local Test Account

For local testing, create a new account such as:

```text
Username: testuser
Password: Password123
```

Do not use this as a real production password.

## Available NPM Scripts

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm start
```

Run ESLint:

```bash
npm run lint
```

Run ESLint auto-fix:

```bash
npm run lint:fix
```

## Project Requirements Checklist

* Node.js backend
* Express server
* MongoDB database
* At least two MongoDB collections
* CRUD-style database operations
* HTML5 frontend
* Vanilla JavaScript frontend
* ES6 modules
* Client-side rendering
* Signup form
* Login form
* Add holding form
* Organized folders for frontend, backend, database, routes, modules, CSS, and pages
* ESLint config file
* Prettier formatting
* Bootstrap styling
* `package.json` included
* MIT License included
* No Mongoose
* No template engines
* No CommonJS `require`
* No secret credentials committed
* Public demo video included
* Screenshot included
* Deployment link included

## Design Document Summary

The design document includes:

* Project description
* MongoDB collections
* CRUD operations
* User personas
* User stories
* Division of work
* Tools and libraries

The app was designed to help users track the value of their stock holdings over time in a simple and understandable way.

## Division of Work

### Najib

* Portfolio calculation engine
* Historical price and stock data logic
* Authentication interfaces
* Portfolio dashboard chart using Chart.js
* Dashboard card rendering and frontend adjustments
* README documentation

### Parker

* Authentication and database setup
* Password hashing with bcrypt
* Session management
* Hosting and application management
* Transaction management UI planning
* Backend and infrastructure support

## How AI Was Used

AI was used as a learning and debugging assistant during development.

AI helped with:

* Explaining Node.js, Express, MongoDB, and Docker setup
* Debugging MongoDB connection issues
* Debugging the add holding route
* Debugging the portfolio dashboard
* Explaining ES6 modules
* Helping organize the README
* Helping explain frontend and backend code step by step

The final code was reviewed and tested locally before being committed.

## Security Notes

This project does not expose real MongoDB credentials in the README.

Local development uses:
```env
MONGO_URI=mongodb://localhost:27017/simple-stock-tracker
```
Any real secret values should be stored in `.env` and not committed to GitHub.

## License

This project uses the MIT License.

