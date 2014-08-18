var express = require('express');
var router = express.Router();
var _ = require('underscore');

/* GET users listing. */
router.get('/', function(req, res) {
    res.send([
        {
            to : 'A',
            receiptId : 2,
            title : 'Korean Food',
            transactions : [
                {
                    from : 'B',
                    amount : 4000
                },
                {
                    from : 'C',
                    amount : 3000
                }
            ],
            createdTimestamp : 1407493380394,
            status : 'writing'
        },
        {
            to : 'B',
            receiptId : 1,
            title : 'Italian Food',
            transactions : [
                {
                    from : 'A',
                    amount : 2000
                },
                {
                    from : 'C',
                    amount : 3000
                }
            ],
            createdTimestamp : 1407493423802,
            status : 'yet'
        }
    ]);
});

router.post('/update', function(req, res) {
    res.send(_.chain(req.body).map(function (receipt) {
        
        if (!receipt.temporary) {
            return null;
        }
        
        receipt.status = 'yet';
        
        return receipt;
        
    }).compact().value());
});

module.exports = router;
