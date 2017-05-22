(function(){
    'use strict';

    /**
     * @ngdoc controller
     * @name userAddModalController
     * @description
     * Controlador del modal de añadir usuario
     */
    angular
        .module('cms.commonControllers')
        .controller('userAddModalController', ['$uibModalInstance', 'Invocation', userAddModalController]);

    function userAddModalController($uibModalInstance, Invocation){
        /*jshint validthis:true */
        var vm = this;

        vm.cancel = cancel;
        vm.addUser = addUser;

        /**
         * @ngdoc method
         * @name addUser
         * @methodOf userAddModalController
         * @description
         * Método para añadir usuario a la database
         */
        function addUser(){
            var reqBody = {
                name: vm.name,
                email: vm.email,
                password: vm.password
            };

            if(vm.isAdmin) reqBody.role = 1;

            Invocation.call('post', 'addUser', reqBody)
                .then(function(response){
                    if(response.data === "true"){
                        $uibModalInstance.close(true);
                    }else{
                        $uibModalInstance.close(response.data);
                    }
                });
        }

        /**
         * @ngdoc method
         * @name cancel
         * @methodOf userAddModalController
         * @description
         * Método para cancelar y cerrar el modal
         */
        function cancel(){ $uibModalInstance.dismiss('cancel'); }
    }

})();