(function(){
    'use strict';

    /**
     * @ngdoc service
     * @name Datatables
     * @description
     * Servicio para la manipulación de Datatables
     */
    angular
        .module('cms.commonServices')
        .factory('Datatables', Datatables);

    function Datatables(){
        
        // Interfaz
        var service = {
            set: set
        };

        return service;

        /**
         * @ngdoc method
         * @name set
         * @methodOf Datatables
         * @description
         * Método inicializacion de una datatable
         * @param {string} tableId Id HTML de la tabla
         * @param {array} columns Columnas definidas para la datatable
         * @param {array} columnDefs Atributos de las columnas (responsive priority)
         * @param {object} data Datos para rellenar la tabla al inicializarla 
         * @param {object} customOpts Objeto de configuración de tabla específico (Para casos de necesidad de definición en un controller)
         */
        function set(tableId, columns, columnDefs, data, customOpts){
            var opts = (customOpts !== null) ? {
                select: true,
                responsive: true,
                lengthChange: false,
                pageLength: 10,
                data: data,
                language: { url: '/assets/i18n/es_ES.json' },
                columns: columns,
                columnDefs: columnDefs,
            } : customOpts;

            return $('#' + tableId).DataTable(opts);
        }

    }

})();