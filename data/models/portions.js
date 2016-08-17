/**
 * Created by Jaswinder on 8/9/2016.
 */
var mongoose = require('mongoose');
var portionsSchema=require('../schema/portions');
module.exports=mongoose.model('portions',portionsSchema);