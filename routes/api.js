const express = require('express');
const router = express.Router();
const Star = require('../models/star');

//middleware is anything we use between the request and response


//we're going to use the express router for all our routes
//(get, post, etc) and instead of saying 'app.get' we'll say
//'router.get', as shown:

//get a list of stars from the database
router.get('/stars', function(req,res,next){
    //to test the route, we are just sending a simple response object
    res.send({type:'GET'});    //this is a dummy response to test the route and return something
 
    // Star.find({}).then(function(stars){   //this method will find all the stars
    //     res.send(stars);
    // })

 
    //this next block is within 'get' and returns by distance from input lat & lng.  for now, disable this
//  Stars.aggregate().near({
//    near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
//    maxDistance: 100000,
//    spherical: true,
//    distanceField: "dist.calculated"
//   }).then(function(stars){
//         res.send(stars);
//   });


});

//add a new star to the db
router.post('/stars', function(req,res,next){

    //since we are importing the model (object), we can use the model here
    //var star = new Star(req.body);
    //use the mongoose method save()
    //star.save();

    //or we can combine the prev 2 actions using the mongoose create method.
    //this returns a promise, so we can wait for it to finish
    //'req.body' is the data we received. 'star' is returned by the promise once
    //the data is saved to mongoose.  Tested in Postman, works great.  Except no error handling.
    //(name is required by the model - right now we crash if it's not provided)
    
    Star.create(req.body).then(function(star){
        res.send(star);        //this is what the user sees
    }).catch(next);

        //this was used when we directly sent back a json object using Postman, but no data storage
    // res.send({
    //     type:'POST',
    //     name: req.body.name,
    //     rank: req.body.rank
    // });
});

//update a star in the db
//for now we are manually entering the id;  I'd like to do this automatically
router.put('/stars/:id', function(req,res,next){
   // console.log(req.params.id);
   //find by id and add new data received from the request body
   Star.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
       //don't put 'star' in the function to be sent back or it will send back the old version.
       //instead, look up the same star again after the update to get the new version
        Star.findOne({_id:req.params.id}).then(function(star){
            res.send(star);
        }); //after updating it, find it again so the updated version can be sent back
    });
});

//delete a specific star from the db
router.delete('/stars/:id', function(req,res,next){
    //console.log(req.params.id);

    //use a mongoose-provided method called 'findByIdAndRemove'
    //so far we have to look up the id manually and provide it to the browser
    Star.findByIdAndRemove({_id:req.params.id}).then(function(star){
        res.send(star);
    });
    //res.send({type:'DELETE'});
});


module.exports = router;