-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "meal" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(80) NOT NULL,
    "image" VARCHAR(1000)
);

CREATE TABLE "ingredient" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"meal_id" INT REFERENCES "meal",
    "list_id" INT REFERENCES "list"
);

CREATE TABLE "list" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(180)
);

