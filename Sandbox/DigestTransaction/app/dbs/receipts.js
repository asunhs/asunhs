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

/*
module.exports.save = function (receipts, callback) {
    
    var results = [];
    
    async.each(receipts, function (receipt, cb) {
        new Receipt(receipt).save(function (err) {
            if (!!err) {
                return cb(err);
            }

            results.push(receipt);
            return cb();
        });
    }, function (err) {
        callback(err, results);
    });
    
};
*/

function save (receipt, cb) {
    
    return db.counters.seq('receiptId', function (err, counter) {

        if (!!err) {
            return cb(err);
        }

        receipt.receiptId = counter.seq;

        return new Receipt(receipt).save(cb);
    });
    
}


function update (receipt, cb) {
    return Receipt.update({ receiptId : receipt.receiptId }, receipt, cb);
}


module.exports.save = function (receipts, callback) {
    
    var results = [];
    
    async.each(receipts, function (receipt, cb) {
        
        if (!receipt.receiptId) {
            // Do create
            receipt.createdTimestamp = Date.now();
            save(receipt, cb);
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
        
        if (!!receipt.receiptId) {
            // Do remove
            receipt.removedTimestamp = Date.now();
            update(receipt, cb);
            results.push(receipt);
        }
        
    }, function (err) {
        callback(err, results);
    });
    
};