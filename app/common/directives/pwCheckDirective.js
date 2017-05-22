(function(){
    'use strict';

    angular
        .module('cms.commonDirectives')
        .directive('pwCheck', pwCheck);
            
    function pwCheck(){
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=pwCheck"
            },
            link: function(scope, element, attributes, ngModel) {
                
                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };
    
                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    }

})();