(function(){
    'use strict';

    /**
     * @ngdoc controller
     * @name userManagementController
     * @description
     * Controlador de la vista para la gestión de usuarios
     */
    angular
        .module('cms.user')
        .controller('userManagementController', ['$rootScope', 'Invocation', 'Notification', 'Modal', userManagementController]);

    function userManagementController($rootScope, Invocation, Notification, Modal){
        /*jshint validthis:true */
        var vm = this;

        // Interfaz
        vm.init = init;
        vm.addUser = addUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.sendMessage = sendMessage;
        vm.getUserList = getUserList;
        vm.getUserConnections = getUserConnections;
        vm.serializeUserConnections = serializeUserConnections;

        /**
         * @ngdoc method
         * @name init
         * @methodOf userManagementController
         * @description
         * Método constructor del controlador
         */
        function init(){
            vm.userList = [];
            vm.notification = {};
            $rootScope.currentState = 'Gestión usuarios';
            vm.isAllowed = (parseInt($rootScope.user.role) === 1);

            if(vm.isAllowed){
                vm.chartOptions = {
                    maintainAspectRatio: true,
                    responsive: true
                };
                
                vm.getUserConnections();
            }
            vm.getUserList();
        }

        /**
         * @ngdoc method
         * @name getUserList
         * @methodOf userManagementController
         * @description
         * Método para obtener la lista de usuarios de la database
         */
        function getUserList(){
            Invocation.call('get', 'getUserList')
                .then(function(response){
                    if(response.data !== false){
                        vm.userList = response.data;
                        vm.userList = _.remove(vm.userList, function(n){
                            return parseInt(n.id) !== parseInt($rootScope.user.id);
                        });
                    }else{
                        Notification.set('danger', 'Error obteniendo lista de usuarios');
                    }
                });
        }

        /**
         * @ngdoc method
         * @name selectUser
         * @methodOf userManagementController
         * @description
         * Método para seleccionar un usuario como destinatario del correo
         * @param {string} username Correo del usuario destinatario
         */
        function selectUser(username){
            vm.notification.user = username;
            $('html body').animate({
                scrollTop: $("#sendNotificationArea").offset().top
            });
        }

        /**
         * @ngdoc method
         * @name getUserConnections
         * @methodOf userManagementController
         * @description
         * Método para obtener los datos de conexión de usuarios
         */
        function getUserConnections(){
            Invocation.call('get', 'getUserConnections')
                .then(function(response){
                    if(response.data !== false){
                        vm.serializeUserConnections(response.data);
                    }else{
                        Notification.set('danger', 'Ha habido un error durante la recopilación de datos');
                    }
                });
        }

        /**
         * @ngdoc method
         * @name serializeUserConnections
         * @methodOf userManagementController
         * @description
         * Método para serializar el objeto de conexiones para inicializar los gráficos de barras
         * @param {object} rawUserConnnections Objeto de conexiones de usuario sin serializar
         */
        function serializeUserConnections(rawUserConnections){
            var serialized = {};
            vm.chartValues = [];
            vm.chartLabels = [];
            rawUserConnections.forEach(function(item){
                serialized[item.name] = (serialized[item.name] === undefined) ? 1 : serialized[item.name] + 1;
            });

            for(var key in serialized){
                vm.chartValues.push(serialized[key]);
                vm.chartLabels.push(key);
            }
        }

        /**
         * @ngdoc method
         * @name deleteUser
         * @methodOf userManagementController
         * @description
         * Método para eliminar un usuario de la database
         */
        function deleteUser(userId){
            var modalItems = {
                title: 'Eliminar usuario',
                msg: '¿Estas seguro que deseas eliminar este usuario?'
            };

            Modal.open('app/common/templates/confirmation-modal-tpl.html', 'confirmationModalController', 'vm', modalItems, 'sm')
                .then(function(output){
                    if(output){
                        var reqBody = { id: userId };

                        Invocation.call('post', 'deleteUser', reqBody)
                            .then(function(response){
                                if(response.data === "true"){
                                    Notification.set('success', 'Usuario eliminado correctamente');
                                    $(window).scrollTop(0);

                                    vm.getUserList();
                                    vm.getUserConnections();
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

        /**
         * @ngdoc method
         * @name addUser
         * @methodOf userManagementController
         * @description
         * Método para añadir un usuario a la database
         */
        function addUser(){
            Modal.open('app/common/templates/userAdd-modal-tpl.html', 'userAddModalController', 'vm', null, 'md')
                .then(function(output){
                    if(output){
                        Notification.set('success', 'Usuario añadido correctamente');
                        $(window).scrollTop(0);

                        vm.getUserList();
                        vm.getUserConnections();
                    }
                })
                .catch(function(error){
                    if(error !== 'cancel' && error !== 'backdrop click'){
                        console.log('Error: ' + JSON.stringify(error));
                    }
                });
        }

        /**
         * @ngdoc method
         * @name sendMessage
         * @methodOf userManagementController
         * @description
         * Método para enviar un mensaje a un usuario
         */
        function sendMessage(){
            var reqBody = {
                userId: $rootScope.user.id,
                email: vm.notification.user,
                subject: vm.notification.subject,
                message: vm.notification.message
            };
             
            Invocation.call('post', 'sendUserMessage', reqBody)
                .then(function(response){
                    if(response.data === "true"){
                        $(window).scrollTop(0);
                        Notification.set('success', 'Mensaje enviado correctamente');
                    }else{
                        $(window).scrollTop(0);
                        Notification.set('danger', 'Error al enviar mensaje, prueba de nuevo');
                    }
               });
        }

        // Inicialización
        vm.init();
    }

})();