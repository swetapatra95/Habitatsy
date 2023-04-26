var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
email: "String",
password: "String",
role: "String",
firstName: "String",
lastName: "String"
}, { collection: 'users' });

module.exports = mongoose.model('users', userSchema);