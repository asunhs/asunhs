var express = require('express');
var router = express.Router();
var _ = require('underscore');
var async = require('async');
var db = require('../dbs');
var digest = require('../services/digest');


/* GET users listing. */
router.get('/', function(req, res) {
    db.receipts.find(null, function (err, receipts) {
        if (!!err) {
            return res.send(err);
        }
        
        return res.send(receipts);
    });
});

router.post('/save', function (req, res) {
    
    var receipts = _.chain(req.body).filter(function (receipt) {
            return !!receipt.temporary;
        }).map(function (receipt) {
            return _.extend(receipt, { 
                status : 'yet',
                transactions : _.filter(receipt.transactions, function (transaction) {
                    return transaction.from && transaction.amount && transaction.amount > 0;
                })
            });
        }).value();
    
    db.receipts.save(receipts, function (err, receipts) {
        res.send(receipts);
    });
    
});

router.post('/remove', function (req, res) {
    
    var receipts = _.filter(req.body, function (receipt) {
        return !!receipt.temporary && !!receipt._id;
    });
    
    db.receipts.remove(receipts, function (err, receipts) {
        res.send(_.map(receipts, function (receipt) {
            return _.pick(receipt, 'temporary');
        }));
    });
});

router.post('/digest', function (req, res) {
    
    async.waterfall([
        function (cb) {
            cb(null, _.chain(req.body).filter(function (receipt) {
                return !!receipt._id;
            }).map(function (receipt) {
                return receipt._id;
            }).value());
        },
        function (receiptIds, cb) {
            db.receipts.findByIds(receiptIds, cb);
        },
        function (receipts, cb) {
            if (_.some(receipts, function (receipt) {
                return receipt.digestId;
            })) {
                return cb(new Error('already digested'));
            }
            
            cb(null, receipts);
        },
        function (receipts, cb) {
            cb(null, receipts, _.chain(receipts).map(function (receipt) {
                return _.map(receipt.transactions, function (transaction) {
                    return {
                        to : receipt.to,
                        from : transaction.from,
                        amount : transaction.amount
                    };
                });
            }).flatten().value())
        },
        function (receipts, transactions, cb) {
            cb(null, receipts, digest.getMethods(digest.summarize(transactions)));
        },
        function (receipts, transactions, cb) {
            db.digests.save([{
                receipts : _.map(receipts, function (receipt) {
                    return receipt._id;
                }),
                transactions : transactions
            }], function (err, digests) {
                
                var digest = digests[0];
                
                async.each(receipts, function (receipt, cb) {
                    receipt.digestId = digest._id;
                    receipt.save(cb);
                }, function (err) {
                    res.send({
                        receipts : receipts,
                        digest : digest
                    });
                });
            });
        }
    ], function (err, results) {
        if (!!err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });
    
});

module.exports = router;
