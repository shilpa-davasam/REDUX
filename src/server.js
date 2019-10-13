//server.js
'use strict'
//first we import our dependencies…
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//and create our instances
const app = express();
const router = express.Router();
const Filter = require('./model/filters');

mongoose.connect('mongodb://localhost:27017/');

const port =  3001;
//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

router.route('/filters')
	 //post new filter to the database
	 .post(function(req, res) {
	 var filter = new Filter();
	 //body parser lets us use the req.body
	 filter.query = req.body.query;
	 filter.save(function(err) {
		 if (err)
			res.send(err);
		 res.json({ message: 'Filter successfully added!' });
	 });
	 
 });

//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});