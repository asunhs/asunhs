var express = require('express');
var router = express.Router();
var _ = require('underscore');
var receiptsDB = require('../dbs/receipts');

/* GET users listing. */
router.get('/', function(req, res) {
    res.send(receiptsDB.find());
});

router.post('/update', function(req, res) {
    
    res.send(receiptsDB.save(_.chain(req.body).map(function (receipt) {
        
        if (!receipt.temporary) {
            return null;
        }
        
        receipt.status = 'yet';
        
        return receipt;
        
    }).compact().value(), function (err, receipt) {
        return receipt;
    }));
});

module.exports = router;
