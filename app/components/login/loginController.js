(function(){
    'use strict';

    /**
     * @ngdoc controller
     * @name loginController
     * @description
     * Controlador de la vista login para acceder al panel de control de contenidos
     */
    angular
        .module('cms.login', [])
        .controller('loginController', ['Auth', loginController]);

    function loginController(Auth){
        /* jshint validthis:true */
        var vm = this;

        // Interfaz
        vm.init = init;
        vm.doLogin = doLogin;

        /**
         * @ngdoc method
         * @name init
         * @methodOf loginController
         * @description
         * Método constructor del controlador
         */
        function init(){
            if(Auth.checkLoginStatus()) window.location.href = 'dashboard.html#/entry-list';
            else{
                vm.loginError = false;
            }
        }

        /**
         * @ngdoc method
         * @name doLogin
         * @methodOf loginController
         * @description
         * Método para realizar el login de usuario
         */
        function doLogin(){
            Auth.login(vm.username, vm.password)
                .then(function(response){
                    if(response.data !== "false"){
                        Auth.authenticate(response.data);
                    }else{
                        vm.loginError = true;
                    }
                });
        }

        // Inicialización
        vm.init();
    }

})();