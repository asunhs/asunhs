var mongoose = require('mongoose');
var Counter = mongoose.model('Counter');
var _ = require('underscore');



module.exports.seq = function (name, cb) {
    Counter.findByIdAndUpdate(name, { $inc: { seq: 1 } }, cb);
};