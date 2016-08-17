/**
 * Created by Jaswinder on 8/10/2016.
 */
var mongoose = require('mongoose');
var logSchema=require('../schema/log');
module.exports=mongoose.model('logdata',logSchema);