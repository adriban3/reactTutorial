const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    author: String,
    title: String,
    description: String,
    Asset: String,
    Date: Date
});

module.exports = mongoose.model('Tickets', ticketSchema);