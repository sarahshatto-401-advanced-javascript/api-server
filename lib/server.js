'use strict';

require('dotenv').config();

// bringing in express library
const express = require('express');

// create an instance of express, save it into a variable gives you the ability that this variable is equal to whatever that function is- adding to that one instance of the function.
const app = express();

// import your other stuff 
const timestamp = require('./middleware/timestamp');
const logger = require('./middleware/logger');
const error = require('./middleware/404');
const error500 = require('./middleware/500');
const { json } = require('express');


// body parser options // any time that you're planning on posting to an API- that's how we get the body of the request
app.use{express.urlencoded({
  extended:true,
})}

app.use(express.json());
app.use(timestamp);
app.use(logger);

app.post('/products', (req, res) => {
  // pushing the req.body into products... it's a post
  products.push(req.body);
  // If everything goes well...send a pretty response!  
  res.status(200).json(req.body);
  // console.log(req.body);
})
// I want the API to return an object containing count and a results[] array.
app.get('/products', (req, res) => {
  res.json({
    count: products.length,
    results = products,
  })
})
app.get('/products/:id', (req, res) => {
  // looking for a specific item (id) within the array - .filter to go through -
  let idFinder = products.filter(obj => {
    if  (obj.id === req.params.id){ 
      return true;
    }
    // send a response with your results at the first position
    res.status(200).json(idFinder[0]);
})
app.put('/products/:id', (req, res) => {})
app.delete('/products:id', (req, res) => {})

app.post('/categories', (req, res) => {})
app.get('/categories', (req, res) => {
  res.json(categories)
})
app.get('/categories/:id', (req, res) => {})
app.put('/categories/:id', (req, res) => {})
app.delete('/categories:id', (req, res) => {})

app.use(error);
app.use(error500);

const categories = [
    {
      name: "FirstTest",
      display_name: "FirstTestDisplayName",
      description: "FirstTestDescription",
      id: 1
    },
    {
      name: "Test2",
      display_name: "2ndTestDisplayName",
      description: "2ndTestDescription",
      id: 2
    }
  ],


const products = [
    {
      name: "FirstProductTest",
      display_name: "FirstProductTestDisplayName",
      description: "FirstProductTestDescription",
      category: "FirstProductTestCategory",
      id: 1
    },
    {
      name: "SecondProductTestCategory",
      id: 2
    },
    {
      name: "3rdProductTestCategory",
      display_name: "2ndProductTestDisplayName",
      description: "2ndProductTestDescription",
      category: "2ndProductTestCategory",
      id: 3
    }
  ]
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