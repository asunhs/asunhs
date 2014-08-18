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
        
        this.pushReceipts = function (modifiedReceipts) {
            
            $http.post('/receipts/update', _.map(modifiedReceipts, function (modifiedReceipt) {
                modifiedReceipt.temporary = uuid();
                return modifiedReceipt;
            })).success(function (receipts) {
                svc.addReceipts(receipts);
            });
            
        };
        
        this.pullReceipts = function () {
            $http.get('/receipts').success(function (receipts) {
                svc.addReceipts(receipts);
            });
        };
    });
}());