(function () {
    'use strict';
    
    
    angular.module('DutchPayApp')
    .service('DigestSvc', function (Receipts) {
        
        var svc = this,
            DIGEST = 'digest',
            BOOK = 'book',
            mode = BOOK;
        
        this.DIGEST = DIGEST;
        this.BOOK = BOOK;
        
        this.getMode = function () {
            return mode;
        };
        
        function cleanNotRegistedReceipts () {
            
            // clean
            _.chain(Receipts).filter(function (receipt) {
                return !receipt.receiptId;
            }).each(function (receipt) {
                Receipts.splice(Receipts.indexOf(receipt), 1);
            });
            
            // clear
            _.each(Receipts, function (receipt) {
                delete receipt.isSelected;
            });
        }
        
        function digestMode () {
            mode = DIGEST;
            
            cleanNotRegistedReceipts();
        }
        
        function bookMode () {
            mode = BOOK;
            
            cleanNotRegistedReceipts();
        }
        
        this.mode = function (mode) {
            switch (mode) {
                case DIGEST: digestMode(); break;
                case BOOK: bookMode(); break;
                default: bookMode(); break;
            }
        };
        
        this.toggle = function () {
            switch (mode) {
                case DIGEST: bookMode(); break;
                case BOOK: digestMode(); break;
                default: bookMode(); break;
            }
        };
        
    });
    
}())