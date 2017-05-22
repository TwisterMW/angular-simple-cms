(function(){
    'use strict';

    angular
        // Module declaration
        .module('cms', [
            'ngRoute',
            'ngSanitize',
            'ui.bootstrap',
            'chart.js',
            'cms.common',
            'cms.login',
            'cms.dashboard',
            'cms.entries',
            'cms.user',
            'cms.support'
        ])

        // Endpoint for MS calls
        .constant('BASE_URL', {
            'DEV': 'backend/ws/',
            'INT': ''
        });

})();