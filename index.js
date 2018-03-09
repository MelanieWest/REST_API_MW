//I can name this anything; also, even though it's in the 'node' folder,
//the program knows where to look for it so I don't have to name the path

const express = require('express');
//set up express app function, which has many http methods
//(such as get, post, etc) built into it
const app = express();

const bodyParser = require('body-parser');

//to connect to the database, we need to require mongoose
const mongoose = require("mongoose");

//use the mongoose method 'connect' to connect to db, naming the db here
mongoose.connect('mongodb://localhost/stars');
mongoose.Promise = global.Promise;

//enable my program to interact with a front-end in the 'public' folder
app.use(express.static('public'));

//use bodyParser before routes, so the body data is json parsed before being sent
//(this is middleware #1)
app.use(bodyParser.json());

//I need to link with the api file in the routes folder, which contains all my routes:
const routes = require('./routes/api');

//when I use my routes, I want them to have the 'api' url in them;
//add that here and it will be added to the front of all the route names
//(this is middleware #2)
app.use('/api',routes);

//create middleware to handle errors (this is the third, or 'next', middleware
//in our stack of middleware that the routers will use)
app.use(function(err,req,res,next){
    //console.log(err);  //this has lots of info - use 'message'
    res.status(422).send({error:err.message});
});

//set it up to listen for requests that I might make
app.listen(process.env.port || 4000, function(){
    console.log('listening on port 4000 for requests')
});

//i am adding this comment to test my ssh key
//I updated to the newest version of git, on 3/6/18.
