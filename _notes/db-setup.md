## Use different db for different environment
we use environment variable process.env.NODE_ENV to specify whether or not the server is 
currently running which environment

In config/keys.js, expose config for dev or prod
  ```
    if (process.env.NODE_ENV === "production") {
      // Heroku will set process.env
      module.exports = require('./prod');
    } else {
      module.exports = require('./dev');
    }
  ```
Here, I use same db for dev and prod environment.

When server running in testing environment, we do not connect to db in app.js
  ```
  if (process.env.NODE_ENV !== "test")
    mongoose.connect(keys.mongoURI, { useMongoClient: true });
  ```

The unit test is running with NODE_ENV=test
"test": "NODE_ENV=test nodemon --exec 'mocha --recursive -R min'"

connect to temporary db "mongodb://localhost/mongo-music-temp"



## reference 
The Complete Developers Guide to MongoDB - 115 Dev vs Test Environments
  - https://www.udemy.com/the-complete-developers-guide-to-mongodb/
  - https://github.com/StephenGrider/MongoCasts
 