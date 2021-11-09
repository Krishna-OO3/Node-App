const mongoose = require('mongoose');
const MongoURI = "mongodb+srv://Krishna:nZFO2UKTb7aTWV1V@cluster-1.07kz7.mongodb.net/"

const InitMongoServer = async() => {
    try{
        await mongoose.connect(MongoURI,{
            useNewUrlParser: true
        });
    }catch(e){
        console.log("Error");
        throw e;
    }
}

module.exports = InitMongoServer;