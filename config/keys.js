// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === "production") {
  // Heroku will set process.env
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
