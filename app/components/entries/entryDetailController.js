(function(){
    'use strict';

    /**
     * @ngdoc controller
     * @name entryDetailController
     * @description
     * Controlador de la vista de detalle de una entrada
     */
    angular
        .module('cms.entries')
        .controller('entryDetailController', ['$rootScope', '$routeParams', '$location', 'Invocation', 'Modal', 'Notification', entryDetailController]);

    function entryDetailController($rootScope, $routeParams, $location, Invocation, Modal, Notification){
        /*jshint validthis:true */
        var vm = this;

        // Interfaz
        vm.init = init;
        vm.deleteEntry = deleteEntry;

        /**
         * @ngdoc method
         * @name init
         * @methodOf entryDetailController
         * @description
         * Método constructor de la clase
        */
        function init(){
            var base_url = 'backend/';

            Invocation.call('post', 'getEntryById', $routeParams)
                .then(function(response){
                    vm.entry = response.data;
                    $('#image-container').css('background-image', 'url(' + base_url + 'uploads/' + vm.entry.image + ")");
                    $rootScope.currentState = vm.entry.titulo + " - Detalle";
                });
        }

        /**
         * @ngdoc method
         * @name deleteRow
         * @methodOf entryDetailController
         * @description
         * Método para borrar una entrada
        */
        function deleteEntry(){
            var modalItems = {
                    title: 'Eliminar entrada',
                    msg: '¿Estas seguro que deseas eliminar esta entrada?'
                };

                Modal.open('app/common/templates/confirmation-modal-tpl.html', 'confirmationModalController', 'vm', modalItems, 'sm')
                    .then(function(output){
                        if(output){
                            var reqBody = { id: $routeParams.id };

                            Invocation.call('post', 'deleteEntry', reqBody)
                                .then(function(response){
                                    if(response.data === "true"){
                                        Notification.set('success', 'Entrada eliminada correctamente');
                                        $location.path('/');
                                    }
                                });
                        }
                    })
                    .catch(function(error){
                        if(error !== 'cancel' && error !== 'backdrop click'){
                            console.log('Error: ' + JSON.stringify(error));
                        }
                    });
        }

        // Inicialización
        vm.init();
    }

})();