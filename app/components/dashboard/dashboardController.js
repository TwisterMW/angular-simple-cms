(function(){
    'use strict';

    /**
     * @ngdoc controller
     * @name dashboardController
     * @description
     * Controlador de la vista dashboard del control panel
     */
    angular
        .module('cms.dashboard', [])
        .controller('dashboardController', ['$rootScope', 'Auth', 'Storage', 'Notification', dashboardController]);

    function dashboardController($rootScope, Auth, Storage, Notification){
        /*jshint validthis:true */
        var vm = this;

        // Interfaz
        vm.init = init;
        vm.doLogout = doLogout;
        vm.hideAlert = hideAlert;

        /**
         * @ngdoc method
         * @name init
         * @methodOf dashboardController
         * @description
         * Método constructor del controlador
         */
        function init(){
            if(!Auth.checkLoginStatus()) window.location.href = "index.html";
            else{
                $rootScope.user = Storage.getItem('bu-cms-user');
            }
        }

        /**
         * @ngdoc method
         * @name doLogout
         * @methodOf dashboardController
         * @description
         * Método para cerrar sesión en el CMS
         */
        function doLogout(){ Auth.logout(); }

        /**
         * @ngdoc method
         * @name hideAlert
         * @methodOf dashboardController
         * @description
         * Método esconder la notificación de Alert
         */
        function hideAlert(){ Notification.hide(); }

        // Inicialización
        vm.init();
    }

})();