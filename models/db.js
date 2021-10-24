const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

exports.connect = () =>{
    mongoose.connect(MONGO_URI,{
        useUnifiedTopology:true
    }).then(() => {
        console.log("Successfully Connected to Database");
    }).catch((error) =>{
        console.log("Error Connecting to Database");
    });
};

