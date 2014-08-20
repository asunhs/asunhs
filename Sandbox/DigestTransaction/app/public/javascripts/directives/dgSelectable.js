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
                        
                    var receipt = scope.dgSelectable;
                    
                    if (DigestSvc.getMode() != DigestSvc.modes.DIGEST) {
                        return;
                    }

                    if (receipt.digestId) {
                        return;
                    }
                    
                    scope.$apply(function() {
                    
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