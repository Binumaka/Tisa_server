const mongoose = require('mongoose');

const ornamentSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },

    price: {
        type: Number,
        require : true
    }, 

    weight: {
        type: String,
    }, 

    length: {
        type: String,
    }, 

    category: {
        type: String,
        require : true
    }, 

    rating: {
        type: String
    }, 

    tags: {
        type: String,
        require : true
    }, 

    description: {
        type: String,
        require : true
    }, 

    available: {
        type: String,
        require : true
    }, 

    section: {
        type: String,
        require : true
    }, 

    image:{
        type:String,
        require:true
    },

    image1:{
        type:String,
    },

    image2:{
        type:String,
    },  
});

const OrnamentModel = mongoose.model("Ornament",ornamentSchema);
module.exports = OrnamentModel;