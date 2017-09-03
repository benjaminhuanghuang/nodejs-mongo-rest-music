# Node.js + Mongo + React + Materialize App
  https://ben-mongo-music.herokuapp.com/


## Dev environment
  client running on 3010 by using webpack-dev-server
  
  server running on 8010

  script:
  "dev": "concurrently \"npm run server:dev\" \"npm run client\"",

## Prod environment
  server running on 8010
  client side code was bundling into /client by using npm script
  ```
     "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
  ```

  in server.js setup static folder to /client
  ```
  app.use(express.static("client"));
  ```

## Deploy to heroku
  - Don't hard code port 
  ```
  const PORT = process.env.PORT || 8010;   // for heroku deployment
  ```

  - To install dev dependency:
  $heroku config:set NPM_CONFIG_PRODUCTION=false

  - Commands
  $ heroku login
  
  $ heroku create ben-mongo-music
  
  $ git push heroku master 

  $ heroku open


## Use faker create testing data.
  npm i faker -D
  
## Reference
  - https://www.udemy.com/the-complete-developers-guide-to-mongodb
  - https://github.com/StephenGrider/UpStarMusic
  - https://www.udemy.com/webpack-2-the-complete-developers-guide/
  - https://github.com/StephenGrider/WebpackProject