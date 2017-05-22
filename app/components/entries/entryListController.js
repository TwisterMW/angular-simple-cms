(function(){
    'use strict';

    /**
     * @ngdoc controller
     * @name entryListController
     * @description
     * Controlador de la vista para mostrar la lista de entradas publicadas
     */
    angular
        .module('cms.entries')
        .controller('entryListController', ['$scope', '$rootScope', '$location', 'Invocation', 'Datatables', 'Modal', 'Notification', entryListController]);

    function entryListController($scope, $rootScope, $location, Invocation, Datatables, Modal, Notification){
        /*jshint validthis:true */
        var vm = this;

        // Interfaz
        vm.init = init;
        vm.deleteRow = deleteRow;
        vm.getEntryList = getEntryList;
        vm.loadDataTable = loadDataTable;
        vm.refillDatatable = refillDatatable;
        vm.viewEntryDetails = viewEntryDetails;
        vm.updateSelectedRows = updateSelectedRows;

        /**
         * @ngdoc method
         * @name init
         * @methodOf entryListController
         * @description
         * Método constructor del controlador
         */
        function init(){
            vm.rowSelected = false;
            $rootScope.currentState = 'Publicaciones';
            vm.getEntryList();
        }


        /**
         * @ngdoc method
         * @name getEntryList
         * @methodOf entryListController
         * @description
         * Método para obtener la lista de entradas de la database
         * @param {bool} refill Parámetro para indicar si es inicialización o redraw de datos de la datatable
         */
        function getEntryList(refill){
            Invocation.call('get', 'getEntries')
                .then(function(response){
                    vm.entryList = response.data;

                    if(refill) vm.refillDatatable();
                    else vm.loadDataTable();
                });
        }

        /**
         * @ngdoc method
         * @name refillDatatable
         * @methodOf entryListController
         * @description
         * Método para redibujar la datatable
         */
        function refillDatatable(){
            vm.table.clear();
            vm.table.rows.add(vm.entryList);
            vm.table.draw();
            vm.rowSelected = false;
        }

        /**
         * @ngdoc method
         * @name loadDataTable
         * @methodOf entryListController
         * @description
         * Método para cargar los datos en la tabla
         */
        function loadDataTable(){
            var columns = [
                { data: 'author' },
                { data: 'fecha_publicacion' },
                { data: 'titulo' },
                { data: 'description' }
            ];

            var columnDefs = [
                { responsivePriority: 1, target: 0 },
                { responsivePriority: 2, target: 2 },
                { responsivePriority: 3, target: 1 },
                { responsivePriority: 4, target: 3 },
                { responsivePriority: 5, target: 4 }
            ];

            vm.table = Datatables.set('entryList', columns, columnDefs, vm.entryList);

            // Attaching selection events
            vm.table.on('select', vm.updateSelectedRows);
            vm.table.on('deselect', vm.updateSelectedRows);
        }

        /**
         * @ngdoc method
         * @name updateSelectedRows
         * @methodOf entryListController
         * @description
         * Método para actualizar las filas seleccionadas en la datatable
         * @param {object} e Eventos asociados a la datatable
         * @param {object} dt Instancia datatable
         * @param {string} type Tipo de elemento seleccionado
         * @param {int | array} indexes Indices seleccionados
         */
        function updateSelectedRows(e, dt, type, indexes){
            if (type === 'row'){
                var isSelected = vm.table.rows({ selected: true }).count();
                vm.rowSelected = (isSelected > 0) ? indexes[0] : false; 

                $scope.$apply();
            }
        }

        /**
         * @ngdoc method
         * @name deleteRow
         * @methodOf entryListController
         * @description
         * Método para eliminar una fila seleccionada de la datatable
         */
        function deleteRow(){
            if(vm.rowSelected !== false){

                var modalItems = {
                    title: 'Eliminar entrada',
                    msg: '¿Estas seguro que deseas eliminar esta entrada?'
                };

                Modal.open('app/common/templates/confirmation-modal-tpl.html', 'confirmationModalController', 'vm', modalItems, 'sm')
                    .then(function(output){
                        if(output){
                            var entryId = vm.table.row(vm.rowSelected).data().id;
                            var reqBody = { id: entryId };

                            Invocation.call('post', 'deleteEntry', reqBody)
                                .then(function(response){
                                    if(response.data === "true"){
                                        Notification.set('success', 'Entrada eliminada correctamente');
                                        $(window).scrollTop(0);
                                        vm.getEntryList(true);
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
        }

        /**
         * @ngdoc method
         * @name viewEntryDetails
         * @methodOf entryListController
         * @description
         * Método para redirigir la vista a los detalles de una entrada
         */
        function viewEntryDetails(){ $location.path('/entry-detail/' + vm.table.row(vm.rowSelected).data().id); }

        // Inicialización
        vm.init();
    }

})();