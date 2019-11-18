# Grocery Guru

Grocery Guru is a mobile-first web application that is designed to bridge the gap between a user's favorite meals and their grocery needs. Users can create grocery lists based on their necessity, and they can manually add ingredients straight to a list. Users can also store their favorite meals by adding a new recipe. They can then select a meal and add its ingredients to any of their grocery lists they've created. 

## Built With

* HTML
* CSS
* JavaScript
* Node.js
* Express
* React
* Redux
* Saga
* Sweet Alerts
* Passport

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required before you attempt to start the app (e.g. node, mongo).

- [Node.js](https://nodejs.org/en/)
- [Postgres](https://postgresapp.com/)

## Create database and table

Create a new database called `prime_app` and create a `user` table:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
```

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`

Please refer to the database.sql file for additional database schema.

### Installing

Steps to get the development environment running.

1. Download this project.
2. `npm install`
3. `npm run server`
4. `npm run client`

## Documentation

https://docs.google.com/document/d/1pZR8mBmHNTxxDPfa_ptXowx4DQVVxV_FnC_skLBC1m4/edit#heading=h.x5497hm2698b (Will need to request access to view)

### Completed Features

- Users are able to create grocery lists and add ingredients
- Users are able to create meals and store those in their favorite meals list
- Users can add meal ingredients to their grocery lists

### Next Steps

- I would like to implement a Recipe API to allow users to search for meals besides needing to add them manually
- Creating a social system where you can add friends, view their meals, and add their meals to your own list

## Authors

* Ryan McCartan

## Acknowledgments

* Thank you to my Porta cohort, my instructors Casie and Dev, and the rest of the Prime Digital Academy Staff for giving me the support and encouragement to make this application.