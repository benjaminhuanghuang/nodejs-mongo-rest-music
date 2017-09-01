# Node.js + Mongo + React + Materialize App
  https://ben-mongo-music.herokuapp.com/


## Dev environment
  client running on 3010 by using webpack-dev-server
  
  server running on 8010

  script:
  "dev": "concurrently \"npm run server:dev\" \"npm run client\"",

## Prod environment
  server running on 8010
  client side code was bundling into /client
  ```
     "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
  ```

  in server.js setup static folder to /client
  ```
  app.use(express.static("client"));
  ```

## Deploy to heroku
  $ heroku login
  
  $ heroku create ben-mongo-music
  
  $ git push heroku master 

  $ heroku open
  
## Reference
  - https://www.udemy.com/the-complete-developers-guide-to-mongodb
  - https://github.com/StephenGrider/UpStarMusic