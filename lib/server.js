'use strict';

// bringing in express library
const express = require('express');

// import your other stuff 
const timestamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger.js');
const error404 = require('./middleware/404.js');
const error500 = require('./middleware/500.js');
const categoryRoutes = require('../routes/categories.js');
const productRoutes = require('../routes/product.js');
const { json } = require('express');

// Routes
const v1Routes = require('../routes/v1.js');

// create an instance of express, save it into a variable gives you the ability that this variable is equal to whatever that function is- adding to that one instance of the function.
const app = express();

// body parser options // any time that you're planning on posting to an API- that's how we get the body of the request
app.use(express.urlencoded({
  extended:true,
}))

// Express middleware ... body parser
app.use(express.json());

app.use(timestamp);
app.use(logger);

app.use(categoryRoutes);
app.use(productRoutes);

app.use(error404);
app.use(error500);

// this was how it was done in the demo: // 
// function start(port){
//   app.listen(port, () => console.log('running on', port));
// }

// module.exports = {
//   start: start,
//   server: app,
// }

module.exports = {
  server: app,
  start: (port) => {
  app.listen(port, () => console.log('running on', port));
  }
}