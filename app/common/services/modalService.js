(function(){
    'use strict';

    /**
     * @ngdoc service
     * @name Modal
     * @description
     * Servicio para la manipulación de modales vía $uibModal
     */
    angular
        .module('cms.commonServices')
        .factory('Modal', ['$uibModal', Modal]);

    function Modal($uibModal){

        // Interfaz
        var service = {
            open: open
        };

        return service;

        /**
         * @ngdoc method
         * @name open
         * @methodOf Modal
         * @description
         * Método abrir un modal
         * @param {string} templateUrl Url de la template HTML del modal 
         * @param {string} controller Controller asociado
         * @param {string} controllerAs Alias para el controller asociado
         * @param {object} items Objeto items para enviar al modal
         * @param {string} size Tamaño del modal (xs, sm, md, lg)
         * @param {object} customOpts Objeto de configuración de modal específico (Para casos de necesidad de definición en un controller)
         */
        function open(templateUrl, controller, controllerAs, items, size, customOpts){
            var opts = (customOpts === null || customOpts === undefined) ? {
                animation: true,
                templateUrl: templateUrl,
                controller: controller,
                controllerAs: controllerAs,
                size: (size !== null && size !== undefined) ? size : 'md',
                resolve: {
                    items: function (){
                        return items;
                    }
                }
            } : customOpts;

            return $uibModal.open(opts).result;
        }

    }

})();