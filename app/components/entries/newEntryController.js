(function(){
    'use strict';

    /**
     * @ngdoc controller
     * @name newEntryController
     * @description
     * Controlador de la vista para escribir una nueva publicación
     */
    angular
        .module('cms.entries')
        .controller('newEntryController', ['$rootScope', 'Storage', '$location', 'Invocation', 'Notification', newEntryController]);

    function newEntryController($rootScope, Storage, $location, Invocation, Notification){
        /*jshint validthis:true */
        var vm = this;

        // Interfaz
        vm.init = init;
        vm.addEntry = addEntry;
        vm.selectImage = selectImage;

        /**
         * @ngdoc method
         * @name init
         * @methodOf newEntryController
         * @description
         * Método constructor del controlador
         */
        function init(){
            vm.entry = {};
            vm.currentDate = moment().format('DD/MM/Y');
            vm.user = Storage.getItem('bu-cms-user');
            $rootScope.currentState = 'Nueva publicación';

            // Initializing HTML rich text editor
            CKEDITOR.replace('entryPost', {
                toolbarGroups: [
                    {"name":"basicstyles","groups":["basicstyles"]},
                    {"name":"links","groups":["links"]},
                    {"name":"paragraph","groups":["list","blocks"]},
                    {"name":"document","groups":["mode"]},
                    {"name":"insert","groups":["insert"]},
                    {"name":"styles","groups":["styles"]}
                ],
                htmlEncodeOutput: true,
                removeButtons: 'Anchor,About'
            });
        }

        /**
         * @ngdoc method
         * @name selectImage
         * @methodOf newEntryController
         * @description
         * Método para seleccionar la imagen del input=file que está oculto
         */
        function selectImage(){
            $('#entryImage').change(function () {
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

            $("#entryImage").trigger('click');
        }

        /**
         * @ngdoc method
         * @name addEntry
         * @methodOf newEntryController
         * @description
         * Método para añadir la entrada en la database
         */
        function addEntry(){
            var reqBody = {
                title: vm.entry.title,
                author: vm.user.id,
                image: document.getElementById('entryImage').files[0],
                post: CKEDITOR.instances.entryPost.getData()
            };

            var isMissingData = false;
            for(var prop in reqBody){
                if(reqBody[prop] === undefined || reqBody[prop] === null || reqBody[prop] === "") isMissingData = true;
            }

            if(!isMissingData){
                Invocation.call('post', 'addEntry', reqBody, true)
                    .then(function(response){
                        if(response.data === "true"){
                            Notification.set('success', 'Entrada añadida correctamente');
                            $location.path('/');
                        }else{
                            switch(response.data){
                                case 'error-image-upload':
                                case 'error-image-size':
                                    Notification.set('danger', 'Error de imagen, prueba con una imagen más pequeña');
                                break;
                            }
                        }
                    });
            }else{
                $(window).scrollTop(0);
                Notification.set('danger', 'Por favor completa toda la información antes de publicar');
            }
        }

        // Inicialización
        vm.init();
    }

})();