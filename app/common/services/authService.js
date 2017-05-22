(function(){
    'use strict';

    /**
     * @ngdoc service
     * @name Auth
     * @description
     * Servicio para el control de la autenticación de usuario y loginStatus
     */
    angular
        .module('cms.commonServices')
        .factory('Auth', ['Invocation', 'Storage', Auth]);

    function Auth(Invocation, Storage){
        var service = {
            login: login,
            logout: logout,
            authenticate: authenticate,
            checkLoginStatus: checkLoginStatus
        };

        return service;

        /**
         * @ngdoc method
         * @name call
         * @methodOf Auth
         * @description
         * Método iniciar sesion de usuario
         * @param {string} username Nombre de usuario de login
         * @param {string} password Contraseña de usuario de login
         */
        function login(username, password){
            var reqBody = {
                username: username,
                password: password
            };

            return Invocation.call('post', 'login', reqBody);
        }

        /**
         * @ngdoc method
         * @name logout
         * @methodOf Auth
         * @description
         * Método para cerrar sesion de usuario
         */
        function logout(){
            Storage.deleteItem('bu-cms-user');
            window.location.href = "/index.html";
        }

        /**
         * @ngdoc method
         * @name authenticate
         * @methodOf Auth
         * @description
         * Método definir un estado de autenticación para el usuario
         * @param {string} userObj Objeto de usuario
         */
        function authenticate(userObj){
            var reqBody = { id: userObj.id };

            Invocation.call('post', 'updateLastConnection', reqBody)
                .then(function(response){
                    if(response.data === "true"){
                        Storage.setItem('bu-cms-user', userObj);
                        window.location.href = 'dashboard.html#/entry-list';
                    }
                });
        }

        /**
         * @ngdoc method
         * @name checkLoginStatus
         * @methodOf Auth
         * @description
         * Método comprobar el estado desesion actual
         */
        function checkLoginStatus(){ return Storage.isItem('bu-cms-user'); }
        
    }

})();