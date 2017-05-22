(function(){
    'use strict';

    /**
     * @ngdoc service
     * @name Storage
     * @description
     * Servicio para el control del localStorage
     */
    angular
        .module('cms.commonServices')
        .factory('Storage', Storage);

    function Storage(){

        // Interfaz
        var service = {
            isItem: isItem,
            getItem: getItem,
            setItem: setItem,
            updateItem: updateItem,
            deleteItem: deleteItem
        };

        return service;

        /**
         * @ngdoc method
         * @name isItem
         * @methodOf Storage
         * @description
         * Método para comprobar si existe o no un objeto en el storage
         * @param {string} username Nombre del objeto a comprobar
         */
        function isItem(name){
            return window.localStorage.getItem(name);
        }

        /**
         * @ngdoc method
         * @name getItem
         * @methodOf Storage
         * @description
         * Método llamar a un microservicio
         * @param {string} username Nombre del objeto a recuperar del storage
         */
        function getItem(name){
            if(isItem(name)) return JSON.parse(window.localStorage.getItem(name));
        }

        /**
         * @ngdoc method
         * @name setItem
         * @methodOf Storage
         * @description
         * Método guardar un objeto en localStorage
         * @param {string} name Nombre del objeto a guardar
         * @param {object} obj Objeto a guardar
         */
        function setItem(name, obj){
            window.localStorage.setItem(name, JSON.stringify(obj));
        }

        /**
         * @ngdoc method
         * @name updateItem
         * @methodOf Storage
         * @description
         * Método actualizar las propiedades de un item
         * @param {string} name Nombre del item a actualizar
         * @param {string | array} Nombre de la propiedad a actualizar (Admite array de propiedades)
         * @param {string | array} Valor de la propiedad a actualizar (Admite array de valores)
         */
        function updateItem(name, objProp, objValue){
            if(isItem(name)){
                var tempObject = JSON.parse(window.localStorage.getItem(name));
                
                if(objProp instanceof Array && objValue instanceof Array && objProp.length === objValue.length){
                    for(var i = 0;i < objProp.length;i++){
                        tempObject[objProp[i]] = objValue[i];
                    }
                }else{
                    tempObject[objProp] = objValue;
                }
            }
        }

        /**
         * @ngdoc method
         * @name deleteItem
         * @methodOf Storage
         * @description
         * Método para eliminar un item
         * @param {string} name Nombre del item a eliminar
         */
        function deleteItem(name){
            if(isItem(name)) window.localStorage.removeItem(name);
        }
    }

})();