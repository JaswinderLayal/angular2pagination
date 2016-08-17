/**
 * Created by Jaswinder on 8/9/2016.
 */
var mongoose = require('mongoose');
var portionSchema =new mongoose.Schema({
    name: String,
    vendor: String,
    tryDate: Date,
    ingredients: [String],
    ratings: {
        strength: Number,
        flavor: Number
    },
    grade: Number
});
module.exports = portionSchema;