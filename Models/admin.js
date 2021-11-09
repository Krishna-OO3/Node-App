const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    AdminUser: {type: String, required: true},
    AdminEmail: {type: String, required: true},
    Password: {type: String, required: true},
    SecurityQ: {type: String, required: true},
    CreationDate: {type: Date, required: Date.now()}
});

// export model user with UserSchema
module.exports = mongoose.model("Admin", AdminSchema);