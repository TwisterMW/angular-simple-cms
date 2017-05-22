(function(){
    'use strict';

    /**
     * @ngdoc controller
     * @name supportController
     * @description
     * Controlador de la vista de soporte técnico
     */
    angular
        .module('cms.support', [])
        .controller('supportController', ['$rootScope', 'Invocation', 'Notification', supportController]);

    function supportController($rootScope, Invocation, Notification){
        /*jshint validthis:true */
        var vm = this;

        // Interfaz
        vm.init = init;
        vm.selectImage = selectImage;
        vm.sendMessage = sendMessage;

        /**
         * @ngdoc method
         * @name init
         * @methodOf supportController
         * @description
         * Método constructor del controlador
         */
        function init(){
            $rootScope.currentState = 'Soporte';
        }

        /**
         * @ngdoc method
         * @name selectImage
         * @methodOf supportController
         * @description
         * Método para seleccionar una imagen
         */
        function selectImage(){
            $('#supportImage').change(function () {
                var file = this.files[0];
                var reader = new FileReader();
                
                reader.onloadend = function () {
                    $('#image-picker').css('background-image', 'url("' + reader.result + '")');
                    $('#image-picker').css('background-size', 'cover');
                    $('#image-picker').css('border', '5px solid #CCC');
                };
                
                if(file) {
                    reader.readAsDataURL(file);
                }
            });

            $("#supportImage").trigger('click');
        }

        /**
         * @ngdoc method
         * @name sendMessage
         * @methodOf supportController
         * @description
         * Método para enviar el mensaje de soporte
         */
        function sendMessage(){
            var reqBody = {
                userId: $rootScope.user.id,
                message: vm.message
            };

            if(vm.isImage) reqBody.image = document.getElementById('supportImage').files[0];
             
            Invocation.call('post', 'sendSupportMessage', reqBody, vm.isImage)
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