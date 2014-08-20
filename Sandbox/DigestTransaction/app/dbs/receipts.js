var mongoose = require('mongoose');
var Receipt = mongoose.model('Receipt');
var _ = require('underscore');
var async = require('async');
var db = require('../dbs');



module.exports.find = function (conditions, cb) {
    
    return Receipt.find({ removedTimestamp : null }, function (err, receipts) {
        if (!!err) {
            return cb(err, null);
        }
        
        return cb(null, receipts);
    });
    
};



module.exports.save = function (receipts, callback) {
    
    var results = [];
    
    async.each(receipts, function (receipt, cb) {
        
        if (!receipt._id) {
            // Do create
            receipt.createdTimestamp = Date.now();
            
            return new Receipt(receipt).save(function (err, result) {
                result._doc.temporary = receipt.temporary;
                results.push(result);
                cb();
            });
        } else {
            // Do update
            receipt.modifiedTimestamp = Date.now();
            
            return Receipt.update({ '_id' : receipt._id }, receipt, function (err, result) {
                // TODO 동작하지 않는 코드
                result._doc.temporary = receipt.temporary;
                results.push(result);
                cb();
            });
        }
        
    }, function (err) {
        callback(err, results);
    });
    
};


module.exports.remove = function (receipts, callback) {
    
    var results = [];
    
    async.each(receipts, function (receipt, cb) {
        
        if (!!receipt._id) {
            // Do remove
            receipt.removedTimestamp = Date.now();
            
            return Receipt.update({ '_id' : receipt._id }, receipt, function (err, result) {
                results.push(receipt);
                cb();
            });
        }
        
    }, function (err) {
        callback(err, results);
    });
    
};