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


function insert (receipt, cb) {
    return new Receipt(receipt).save(function (err, result) {
        // TODO result 로 뒤집어 써야 한다.
        receipt._id = result._id;
        cb();
    });    
}


function update (receipt, cb) {
    return Receipt.update({ '_id' : receipt._id }, receipt, cb);
}


module.exports.save = function (receipts, callback) {
    
    var results = [];
    
    async.each(receipts, function (receipt, cb) {
        
        if (!receipt._id) {
            // Do create
            receipt.createdTimestamp = Date.now();
            insert(receipt, cb);
        } else {
            // Do update
            receipt.modifiedTimestamp = Date.now();
            update(receipt, cb);
        }
        
        results.push(receipt);
        
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
            update(receipt, cb);
            results.push(receipt);
        }
        
    }, function (err) {
        callback(err, results);
    });
    
};