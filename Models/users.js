const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    securityQ: {type: String, required: true},
    creationDate: {type: Date, required: Date.now()}
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);