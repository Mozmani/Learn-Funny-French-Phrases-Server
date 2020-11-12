# Learn Funny French Phrases (Server)

this application can be used to learn funny french phrases with spaced repetition.


## Tech Stack
* React
* Node.js
* PostgreSQL


## How to Run

Git clone this and the Learn Funny French Phrase client from github,
npm install both,
run the server and run the client.
(To run locally use localhost link with server!) 
## Local dev setup

If using user `dunder_mifflin`:

```bash
mv example.env .env
createdb -U dunder_mifflin spaced-repetition
createdb -U dunder_mifflin spaced-repetition-test
```

If your `dunder-mifflin` user has a password be sure to set it in `.env` for all appropriate fields. Or if using a different user, update appropriately.

```bash
npm install
npm run migrate
env MIGRATION_DB_NAME=spaced-repetition-test npm run migrate
```

And `npm test` should work at this point


## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests mode `npm test`

Run the migrations up `npm run migrate`

Run the migrations down `npm run migrate -- 0`


## API routes
* /api/auth/token (post, and put)
   Used for Login purposes

* /api/user/token (post, and put)
   used for login purposes

* /api/language (get)

   grabs list of words for the specific user

* /api/language/head (get)

   grabs the first word in the list for the user to translate

* /api/language/guess (post)

   sends the guess and verifies if it matches that word's translation. If it does:
   the word's memory value is doubled, if wrong: memory value becomes 1. After that,
   the word is shifted along the list by the value of its memory value.

## Links
* [Client Repo](https://github.com/Mark-The-Dev/Funny-French-Phrases-Client)
* [Server / API repo](https://github.com/Mark-The-Dev/Learn-Funny-French-Phrases-Server)
* [Live Link](https://client-snowy.vercel.app/login)


## Contributor

Mark Marcello
