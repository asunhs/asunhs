(function () {
    'use strict';
    
    angular.module('DutchPayApp')
    .controller('MainCtrl', function ($scope, ReceiptsSvc, Receipts) {
        
        var isWriting = $scope.isWriting = function (receipt) {
            return receipt.status === 'writing';
        }
        
        ReceiptsSvc.pullReceipts();
        
        $scope.welcome = "Welcome!";
        
        $scope.receipts = Receipts;
        
        $scope.addTransaction = function (receipt) {
            
            if (!isWriting(receipt)) {
                return;
            }
            
            if (!receipt.transactions) {
                receipt.transactions = [];
            }
            
            receipt.transactions.push({});
        };
        
        $scope.addReceipt = function (receipts) {
            
            if (!receipts) {
                return;
            }
            
            receipts.push(ReceiptsSvc.newReceipt());
        };
        
        $scope.saveReceipts = ReceiptsSvc.saveReceipts;
        
        $scope.removeReceipts = ReceiptsSvc.removeReceipts;
    });
}());