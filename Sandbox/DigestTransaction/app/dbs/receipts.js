var mongoose = require('mongoose');
var Receipt = require('../models/receipt');
var _ = require('underscore');



module.exports.find = function (conditions, cb) {
    Receipt.find(function (err, receipts) {
        if (err) {
            return err;
        }
        
        return receipts;
    });
};


module.exports.save = function (receipts, cb) {
    return _.map(receipts, function (receipt) {
        return new Receipt(receipt).save(function (err) {
            if (err) {
                return cb('fail', receipts);
            }
            
            return cb('success', receipts);
        });
    });
};