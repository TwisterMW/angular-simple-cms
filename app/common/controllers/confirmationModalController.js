(function(){
    'use strict';

    /**
     * @ngdoc controller
     * @name confirmationModalController
     * @description
     * Controlador del modal de confirmación
     */
    angular
        .module('cms.commonControllers')
        .controller('confirmationModalController', ['items', '$uibModalInstance', confirmationModalController]);

    function confirmationModalController(items, $uibModalInstance){
        /*jshint validthis:true */
        var vm = this;

        // Interfaz
        vm.init = init;
        vm.accept = accept;
        vm.cancel = cancel;

        /**
         * @ngdoc method
         * @name init
         * @methodOf confirmationModalController
         * @description
         * Método constructor del controlador
         */
        function init(){
            vm.items = items;
        }

        /**
         * @ngdoc method
         * @name accept
         * @methodOf confirmationModalController
         * @description
         * Método para aceptar la confirmación
         */
        function accept(){
            $uibModalInstance.close(true);
        }

        /**
         * @ngdoc method
         * @name cancel
         * @methodOf confirmationModalController
         * @description
         * Método para denegar la confirmación
         */
        function cancel(){
            $uibModalInstance.dismiss('cancel');
        }

        // Inicialización
        vm.init();
    }

})();