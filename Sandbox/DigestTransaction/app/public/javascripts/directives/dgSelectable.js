(function () {
    'use strict';
    
    angular.module('DutchPayApp').directive('dgSelectable', function (DigestSvc) {
        
        return {
            restrict : 'A',
            scope : {
                dgSelectable : '='
            },
            link : function (scope, element, attrs) {
                
                element.on('click', function () {
                    
                    if (DigestSvc.getMode() != DigestSvc.modes.DIGEST) {
                        return;
                    }
                    
                    scope.$apply(function() {
                        
                        var receipt = scope.dgSelectable;
                    
                        if (receipt.isSelected) {
                            delete receipt.isSelected;
                        } else {
                            receipt.isSelected = true;
                        }
                        
                    });
                    
                })
            }
        };
    });
}());