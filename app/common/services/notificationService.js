(function(){
    'use strict';

    /**
     * @ngdoc service
     * @name Notification
     * @description
     * Servicio para la manipulación de las notificaciones alert
     */
    angular
        .module('cms.commonServices')
        .factory('Notification', ['$rootScope', Notification]);

    function Notification($rootScope){

        var service = {
            set: set,
            hide: hide
        };

        return service;

        /**
         * @ngdoc method
         * @name set
         * @methodOf Notification
         * @description
         * Método crear un mensaje de notificación
         * @param {string} type Tipo de notificacion [ info | success | warning | danger ]
         * @param {string} message Mensaje de la notificación
        */
        function set(type, message){
            var icon;

            switch(type){
                case 'danger': icon = 'cancel'; break;
                case 'success': icon = 'checkmark'; break;
                case 'warning': icon = 'eye'; break;
                case 'info': icon = 'empty message'; break;
            }

            $rootScope.currentNotification = {
                type: type,
                message: message,
                icon: icon
            };

            $('#notificationContainer').removeClass('fadeInDown');
            window.setTimeout(function(){
                $('#notificationContainer').addClass('fadeInDown');
                $('#notificationContainer').removeClass('hidden');

                $('#notificationContainer svg').removeClass('rubberBand');
            
                window.setTimeout(function(){
                    $('#notificationContainer svg').addClass('rubberBand');
                }, 100);
            }, 100);
        }

        /**
         * @ngdoc method
         * @name hide
         * @methodOf Notification
         * @description
         * Método cerrar un mensaje de notificación
        */
        function hide(){
            $('#notificationContainer').addClass('hidden');
            $('#notificationContainer').removeClass('fadeInDown');
            $('#notificationContainer svg').removeClass('rubberBand');
        }
    }

})();