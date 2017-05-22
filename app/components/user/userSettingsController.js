(function(){
    'use strict';

    /**
     * @ngdoc controller
     * @name userSettingsController
     * @description
     * Controlador de la vista para la configuración del usuario
     */
    angular
        .module('cms.user')
        .controller('userSettingsController', ['$rootScope', 'Invocation', 'Notification', 'Auth', userSettingsController]);

    function userSettingsController($rootScope, Invocation, Notification, Auth){
        /*jshint validthis:true */
        var vm = this;

        // Interfaz
        vm.init = init;
        vm.changePwd = changePwd;
        vm.changeMail = changeMail;

        /**
         * @ngdoc method
         * @name init
         * @methodOf userSettingsController
         * @description
         * Método constructor del controlador
         */
        function init(){
            vm.newPwd = {};
            $rootScope.currentState = 'Configuración usuario';
        }

        /**
         * @ngdoc method
         * @name changePwd
         * @methodOf userSettingsController
         * @description
         * Método para cambiar la contraseña
         */
        function changePwd(){
            var reqBody = { userId: $rootScope.user.id, old: vm.newPwd.old, new: vm.newPwd.new };

            Invocation.call('post', 'changePwd', reqBody)
                .then(function(response){
                    if(response.data === "true"){
                        $(window).scrollTop(0);
                        Notification.set('success', 'Contraseña cambiada correctamente. En 5 segundos se reiniciará la sesión para aplicar los cambios');
                        window.setTimeout(Auth.logout, 5000);
                    }else{
                        switch(response.data){
                            case 'error-old-pwd':
                                $(window).scrollTop(0);
                                Notification.set('danger', 'Error en tu contraseña antigua. ¡Asegúrate de que es correcta!');
                            break;
                            default: console.log('Error: ' + response.data);
                        }
                    }
                });
        }

        /**
         * @ngdoc method
         * @name changeMail
         * @methodOf userSettingsController
         * @description
         * Método para cambiar el correo electrónico
         */
        function changeMail(){
            var reqBody = { userId: $rootScope.user.id, mail: vm.newEmail };

            Invocation.call('post', 'changeMail', reqBody)
                .then(function(response){
                    if(response.data === "true"){
                        $(window).scrollTop(0);
                        Notification.set('success', 'Email cambiado correctamente. En 5 segundos se reiniciará la sesión para aplicar los cambios');
                        window.setTimeout(Auth.logout, 5000);
                    }else{
                        switch(response.data){
                            case 'error-old-pwd':
                                $(window).scrollTop(0); 
                                Notification.set('danger', 'Error en tu contraseña antigua. ¡Asegúrate de que es correcta!');
                            break;
                            default: console.log('Error: ' + response.data);
                        }
                    }
                });
        }

        // Inicialización
        vm.init();
    }

})();