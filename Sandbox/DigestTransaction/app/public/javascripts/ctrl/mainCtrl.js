(function () {
    'use strict';
    
    angular.module('DutchPayApp')
    .controller('MainCtrl', function ($scope, ReceiptsSvc, Receipts) {
        
        ReceiptsSvc.pullReceipts();
        
        $scope.welcome = "Welcome!";
        
        $scope.receipts = Receipts;
    });
}());