(function () {
    'use strict';
    
    angular.module('DutchPayApp')
    .service('ReceiptsSvc', function ($http, Receipts) {
        
        var svc = this,
            uuid = function() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16);
                });
            };
        
        this.newReceipt = function (receipt) {
            return _.extend({
                status : 'writing',
                temporary : uuid()
            }, receipt);
            
        };
        
        this.getReceipt = function (condition) {
            
            if (condition.temporary) {
                return _.find(Receipts, function (receipt) {
                    return receipt.temporary == condition.temporary;
                });
            }
            
            if (condition.receiptId) {
                return _.find(Receipts, function (receipt) {
                    return receipt.receiptId === condition.receiptId;
                });
            }
            
            return {};
        };
        
        this.addReceipt = function (newReceipt) {
            
            var existed = svc.getReceipt(newReceipt);
            
            if (!!existed) {
                Receipts[_.indexOf(Receipts, existed)] = newReceipt;
            } else {
                Receipts.push(newReceipt);
            }
            
        };
        
        this.addReceipts = function (newReceipts) {
            _.each(newReceipts, svc.addReceipt);
        };
        
        this.pushReceipts = function (receipts) {
            
        };
        
        this.pullReceipts = function () {
            
            svc.addReceipts([
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
        };
    });
}());