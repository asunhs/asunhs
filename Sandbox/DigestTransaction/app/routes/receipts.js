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

router.post('/save', function (req, res) {
    
    var receipts = _.chain(req.body).filter(function (receipt) {
            return !!receipt.temporary;
        }).map(function (receipt) {
            return _.extend(receipt, { 
                status : 'yet',
                transactions : _.filter(receipt.transactions, function (transaction) {
                    return !_.isEmpty(transaction);
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

module.exports = router;
