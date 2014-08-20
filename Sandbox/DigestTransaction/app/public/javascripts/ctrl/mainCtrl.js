(function () {
    'use strict';
    
    angular.module('DutchPayApp')
    .controller('MainCtrl', function ($scope, DigestSvc, ReceiptsSvc, Receipts) {
        
        var isWriting = $scope.isWriting = function (receipt) {
            return receipt.status === 'writing';
        }
        
        ReceiptsSvc.pullReceipts();
        
        $scope.welcome = "Welcome!";
        
        $scope.receipts = Receipts;
        
        $scope.modes = DigestSvc.modes;
        
        $scope.getMode = DigestSvc.getMode;
        
        $scope.digest = DigestSvc.digest;
        
        $scope.saveReceipts = ReceiptsSvc.saveReceipts;
        
        $scope.removeReceipts = ReceiptsSvc.removeReceipts;
        
        
        
        
        $scope.addReceipt = function (receipts) {
            
            if (!receipts) {
                return;
            }
            
            receipts.push(ReceiptsSvc.newReceipt());
        };
        
        $scope.toggleDigestMode = function () {
            DigestSvc.toggle();
        };
        
        $scope.confirmMode = function (mode) {
            return DigestSvc.getMode() === mode;
        };
        
        
        
        
        
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
    });
}());