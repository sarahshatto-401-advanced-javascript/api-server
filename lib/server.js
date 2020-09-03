'use strict';

// bringing in express library
const express = require('express');

// create an instance of express, save it into a variable gives you the ability that this variable is equal to whatever that function is- adding to that one instance of the function.
const app = express();

// import your other stuff 
const timestamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger');
const error404 = require('./middleware/404');
const error500 = require('./middleware/500');
const { json } = require('express');


// body parser options // any time that you're planning on posting to an API- that's how we get the body of the request
app.use(express.urlencoded({
  extended:true,
}))

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
    results: products
  })
})

app.get('/products/:id', (req, res) => {
  // looking for a specific item (id) within the array - .filter to go through -
  let idFinder = products.filter(obj => {
    if  (obj.id === req.params.id.toString()){ 
      return obj;
    } else {
      return false;
    }
  })
  // send a response with your results at the first position
  res.status(200).json(idFinder[0]);
})

app.put('/products/:id', (req, res) => {
// need it to find the id from the params
// need to replace w/ req.body
let results;
// go through the array , for every object that's passed in, we ask if any objects within the products array have an id that matches the req.params.id (the user input). 
// If it does, we store the index position of that obect in the results variable. 
// then go into the products array at that index position and replace it with req.body;
products.forEach((obj, i) => {
  if  (obj.id === req.params.id.toString()){ 
    results = i;
  }
})
  products[results] = req.body; 
  res.status(200).json(req.body);
})


app.delete('/products/:id', (req, res) => {

let deleteResult;
products.forEach((obj, i) => {
  if  (obj.id === req.params.id.toString()){ 
    deleteResult = i;
  }
})
  delete products[deleteResult]; 
  res.status(200).json('successfully deleted');
})

//  //  //  //  CATEGORIES  //  //  //  //  

app.post('/categories', (req, res) => {
  // pushing the req.body into categories... it's a post
  categories.push(req.body);
  // If everything goes well...send a pretty response!  
  res.status(200).json(req.body);
  // console.log(req.body);
})
// I want the API to return an object containing count and a results[] array.
app.get('/categories', (req, res) => {
  res.json({
    count: categories.length,
    results: categories
  })
})

app.get('/categories/:id', (req, res) => {
  // looking for a specific item (id) within the array - .filter to go through -
  let categoriesIdFinder = categories.filter(obj => {
    if  (obj.id === req.params.id.toString()){ 
      return obj;
    } else {
      return false;
    }
  })
  // send a response with your results at the first position
  res.status(200).json(categoriesIdFinder[0]);
})

app.put('/categories/:id', (req, res) => {
  let categoryResults;
  categories.forEach((obj, i) => {
    if  (obj.id === req.params.id.toString()){ 
      categoryResults = i;
    }
  })
    categories[categoryResults] = req.body; 
    res.status(200).json(req.body);
})

app.delete('/categories/:id', (req, res) => {
  let categoryDeleteResult;
categories.forEach((obj, i) => {
  if  (obj.id === req.params.id.toString()){ 
    categoryDeleteResult = i;
  }
})
  delete categories[categoryDeleteResult]; 
  res.status(200).json('successfully deleted');
})

app.use(error404);
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
  ]

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