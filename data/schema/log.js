/**
 * Created by Jaswinder on 8/10/2016.
 */
/**
 * Created by Jaswinder on 8/9/2016.
 */
var mongoose = require('mongoose');
var logSchema =new mongoose.Schema({
    name: String,
    count: Number
});
module.exports = logSchema;