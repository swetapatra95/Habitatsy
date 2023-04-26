var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const bookingSchema = new Schema({
id: "String",
listing_id: "String",
user_id: "String",
check_in: "String",
check_out: "String"
}, { collection: 'bookings' });

module.exports = mongoose.model('bookings', bookingSchema);