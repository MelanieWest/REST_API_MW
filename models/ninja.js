const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//create geolocation Schema
const GeoSchema = new Schema({
    type:{
        type:String,        //this is entered as a string
        default:"Point"
    },
    coordinates:{
        type:[Number],      //array of numbers for coords
        index:"2dsphere"
    }
});


//create ninja schema & model

const NinjaSchema = new Schema({
    name:{
        type:String,
        required: [true, "Name field is required"]
    },
    rank:{
        type: String
    },
    available:{
        type: Boolean,
        default: false
    },
    geometry:GeoSchema     //use the geoschema defined above
});

const Ninja = mongoose.model('ninja',NinjaSchema);
//mongo will create a collection with the plural of the name, 'ninjas'

module.exports = Ninja;