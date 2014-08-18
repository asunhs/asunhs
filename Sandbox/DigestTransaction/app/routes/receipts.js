var express = require('express');
var router = express.Router();
var _ = require('underscore');
var async = require('async');
var db = require('../dbs');


/* GET users listing. */
router.get('/', function(req, res) {
    db.receipts.find(null, function (err, receipts) {
        if (!!err) {
            return res.send(err);
        }
        
        return res.send(receipts);
    });
});

router.post('/update', function(req, res) {
    
    
    async.parallel(_.map(req.body, function (receipt) {
        
        return function (cb) {
            
            if (!receipt.temporary) {
                return cb();
            }
            
            if (!receipt.receiptId) {
                db.counters.seq('receiptId', function (err, counter) {
                    
                    if (!!err) {
                        return cb();
                    }
                    
                    receipt.receiptId = counter.seq;
                    
                    receipt.status = 'yet';
                    
                    receipt.transactions = _.filter(receipt.transactions, function (transaction) {
                        return !_.isEmpty(transaction);
                    });

                    if (!!receipt.createdTimestamp) {
                        receipt.modifiedTimestamp = Date.now();
                    } else {
                        receipt.createdTimestamp = Date.now();
                    }
                    
                    return cb(null, receipt);
                });
            }
        };
        
    }), function (err, results) {
        db.receipts.save(_.compact(results), function (err, receipts) {
            res.send(receipts);
        });
    });
    
});

module.exports = router;
