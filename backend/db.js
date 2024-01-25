const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook?readPreference=primary&appname=MongoDB+Compass&directConnection=true&ssl=false"
//~ localhost, 0.0.0.0
const connectToMongo = () => {
    mongoose.connect(mongoURI);
    console.log("Connected Successfully.");
}
module.exports = connectToMongo;