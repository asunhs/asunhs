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
                status : 'writing'
            }, receipt);
            
        };
        
        this.getReceipt = function (condition) {
            
            if (condition.temporary) {
                return _.find(Receipts, function (receipt) {
                    return receipt.temporary === condition.temporary;
                });
            }
            
            if (condition.receiptId) {
                return _.find(Receipts, function (receipt) {
                    return receipt.receiptId === condition.receiptId;
                });
            }
            
            return;
        };
        
        this.addReceipt = function (newReceipt) {
            
            var existed = svc.getReceipt(newReceipt);
            
            if (!existed && !newReceipt.receiptId) {
                return;
            }
            
            if (!existed) {
                // Create
                Receipts.push(newReceipt);
                return;
            }
            
            if (!newReceipt.receiptId) {
                // Delete
                Receipts.splice(Receipts.indexOf(existed), 1);
                return;
            }
            
            // Update
            _.extend(existed, newReceipt);
            
        };
        
        this.addReceipts = function (newReceipts) {
            _.each(newReceipts, svc.addReceipt);
        };
        
        this.saveReceipts = function (receipts) {
            
            $http.post('/receipts/save', _.map(receipts, function (receipt) {
                receipt.temporary = uuid();
                return receipt;
            })).success(function (results) {
                svc.addReceipts(results);
            });
            
        };
        
        this.removeReceipts = function (receipts) {
            
            $http.post('/receipts/remove', _.map(receipts, function (receipt) {
                receipt.temporary = uuid();
                return receipt;
            })).success(function (results) {
                svc.addReceipts(results);
            });
            
        };
        
        this.pullReceipts = function () {
            $http.get('/receipts').success(function (receipts) {
                svc.addReceipts(receipts);
            });
        };
    });
}());