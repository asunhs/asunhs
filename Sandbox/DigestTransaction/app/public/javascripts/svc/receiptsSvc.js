(function () {
    'use strict';
    
    angular.module('DutchPayApp')
    .service('ReceiptsSvc', function ($http, Receipts) {
        
        var svc = this;
        
        this.getReceipt = function (receiptId) {
            return _.find(Receipts, function (receipt) {
                return receipt.receiptId == receiptId;
            });
        };
        
        this.addReceipt = function (newReceipt) {
            
            var existed = svc.getReceipt(newReceipt.receiptId);
            
            if (!!existed) {
                Receipts[_.indexOf(Receipts, existed)] = newReceipt;
            } else {
                Receipts.push(newReceipt);
            }
            
        }
        
        this.addReceipts = function (newReceipts) {
            _.each(newReceipts, svc.addReceipt);
        }
        
        this.pullReceipts = function () {
            
            svc.addReceipts([
                {
                    receiptId : 1,
                    title : 'Korean Food',
                    transactions : [
                        {
                            from : 'B',
                            to : 'A',
                            amount : 4000
                        },
                        {
                            from : 'C',
                            to : 'A',
                            amount : 3000
                        }
                    ],
                    createTimestamp : 1407493380394
                },
                {
                    receiptId : 0,
                    title : 'Italian Food',
                    transactions : [
                        {
                            from : 'A',
                            to : 'B',
                            amount : 2000
                        },
                        {
                            from : 'C',
                            to : 'B',
                            amount : 3000
                        }
                    ],
                    createTimestamp : 1407493423802
                }
            ]);
        };
    });
}());