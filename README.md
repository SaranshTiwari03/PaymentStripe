## Installation Guide

### Requirements
- [Nodejs](https://nodejs.org/en/download)
- [Mongodb](https://www.mongodb.com/docs/manual/administration/install-community/)

Both should be installed and make sure mongodb is running.

Now install the dependencies
# on cmd promt/powershell 
cd server
npm install

cd client
npm install

We are almost done, Now just start the development server.

For Frontend.
# on cmd promt/powershell 
cd client
npm start

For Backend.

Open another terminal in folder, Also make sure mongodb is running in background.
# on cmd promt/powershell 
cd server
nodemon index.js
or
npx nodemon index.js

Done! Now open localhost:3000 in your browser.

# now env
Create a .env file and enter data as shown in .env.example file

Now enter Your Stripe secret Key and Publishable key As shown here:
https://dashboard.stripe.com/test/dashboard

Your app should be working.




