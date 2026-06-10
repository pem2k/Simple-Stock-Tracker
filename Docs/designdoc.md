## Description

The Simple Stock Tracker is an application that allows users to create an account, sign in, add stock tickers and purchase dates/times. From there, users can review the price change in either a specific stock, or the entire value of their tracked portfolio.

We plan to use either the alpaca api or the python yfinance library to collect our data, this will allow us to calculate changes in price from cost basis on purchase, and publish those changes. Based on recent research, as long as live data directly from alpaca is not being shared, only locally calculated change in value from purchase date, this data can be shared publically. This would involve pulling the data to our backend, calculating the changes, and then only exposing our calculations to the client.

The following functionality will be available:

## Collections

- Historical Stock data collection:
  - This will allow us to seed data for lookup locally to the application, preventing us from running into Alpaca API limits.

- User Collection:
  - This will track usernames, password hashes, and stock purchase tickers/times that will allow us to query the API and local historical data.

## Crud Operations

- Create:
  - Allows creation of user accounts for sign in and data persistence
  - Allows users to create a record of what ticker they purchased and when.

- Read:
  - Gets stock information from outside source (alpaca + historical data source for seeding)

- Update:
  - Allow users to update their username
  - Potentially allow access to full list of stocks and dates purchased for bulk transaction adds, updating the list of tracked assets.

- Delete:
  - Allow users to remove stocks from portfolio once sold.

## Personas

1. Marcus: The IT Professional

Background: Marcus is in his early 30s, works remotely managing production systems, and appreciates lightweight, no-nonsense software. He doesn't have the patience for bloated financial dashboards with features he will never use.

Goals: He wants to quickly log in during his lunch break, see if the handful of tech stocks he bought are trending up or down, and log out.

2. Elena: The Graduate Student

Background: Elena is in her late 20s and balancing coursework and stressful budgeting. She recently started putting a small amount of her savings into a few index funds and popular stock tickers.

Goals: She needs a highly intuitive, visual way to understand if her investments are growing. She wants a simple graph that translates raw data into an easily digestible visual format.

3. David: The Manual Tracker

Background: David is a meticulous individual who has been tracking his stock purchases using a manual Excel spreadsheet for the last year.

Goals: He wants to migrate away from manual spreadsheet formulas to a dedicated web app. He specifically needs the ability to accurately record the exact date and time he purchased a stock to ensure his historical cost basis is tracked correctly.

## User Stories

User Story 1: Secure Authentication

As a user, I want to create an account and log in securely with basic credentials, so that my personal portfolio data and purchase history remain entirely private and separated from other users.

User Story 2: Data Entry & Portfolio Management

As a user, I want to input a specific stock ticker symbol along with the exact date and time of my purchase, so that the system can store this record in the database and accurately track the baseline cost of my portfolio.

User Story 3: Visualizing Performance

As a user, I want to view a dynamic line graph displaying my total portfolio value over time, so that I can quickly assess my overall investment performance at a single glance without needing to calculate the math myself.

## Division of Work

**Backend:**

**Najib**

- **Alpaca API Data Seeding Module:** Fetch historical stock data and seed the local historical price collection (resolves Alpaca API rate limits).
- **Portfolio Calculation Engine:** Change in value module (calculates cost basis vs. current value).

  **Parker**

- **Authentication & Database Setup:** User collection seeding, password hashing (Bcrypt), and session management.
- **Application hosting and management** DB containerizing and hosting, front end hosting, cors setup, external api key management, etc.

**Frontend:**

**Najib:**

- **Authentication Interfaces:** Login and signup forms.
- **Portfolio Dashboard:** Change in total portfolio value graph (using Chart.js).

**Parker:**

- **Single Asset Dashboard:** Change in single ticker value graph (using Chart.js).
- **Transaction Management UI:** Interface to add stock purchases (ticker, date, time) and remove stocks from the portfolio.

## Tools

    HTML
    CSS
    Bootstrap
    Es6 modules
    Alpaca api
    MongoDB
    Express
    Bcrypt (password hasing) (side note - intention is session based auth)
    Chart.js - Library that will allow us to chart the change in value.
