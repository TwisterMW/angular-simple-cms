(function(){
    'use strict';

    /**
     * @ngdoc service
     * @name Invocation
     * @description
     * Servicio para la llamada a microservicios REST
     */
    angular
        .module('cms.common')
        .factory('Invocation', ['$http', 'BASE_URL', Invocation]);

    function Invocation($http, BASE_URL){
        
        // Interfaz
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // Header para subida de ficheros
        var multipartConfig = { 
            headers: {
                'Content-Type': undefined
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });

                var headers = headersGetter();
                delete headers['Content-Type'];

                return formData;
            }
        };
        var service = {
            call: call
        };

        return service;

        /**
         * @ngdoc method
         * @name call
         * @methodOf Invocation
         * @description
         * Método llamar a un microservicio
         * @param {string} type Tipo de llamada HTTP ['POST', 'GET']
         * @param {string} url Endpoint para el microservicio
         * @param {string} data (opcional) Parámetro de datos enviados en caso de ser necesario
         * @param {bool} multipart (opcional) Parámetro para enviar la request con unas cabeceras que acepten ficheros
         */
        function call(type, url, data, multipart){
            if(data === undefined)
                return (type.toUpperCase() === 'POST') ? $http.post(BASE_URL.DEV + url + ".php") : $http.get(BASE_URL.DEV + url + ".php");
            else
                return (type.toUpperCase() === 'POST') ? $http.post(BASE_URL.DEV + url + ".php", data, (multipart !== undefined && multipart !== false) ? multipartConfig : config) : $http.get(BASE_URL.DEV + url + ".php");
        }
    }

})();