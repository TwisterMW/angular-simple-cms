(function(){
    'use strict';

    angular
        .module('cms')
        .config(function($routeProvider, $locationProvider){
            // Disabling anchor prefix (HTML 5 mode)
            $locationProvider.hashPrefix('');

            // Routing declaration
            var entryList = { templateUrl: 'app/components/templates/entry-list-tpl.html', controller: 'entryListController', controllerAs: 'vm' };
            var newEntry = { templateUrl: 'app/components/templates/new-entry-tpl.html', controller: 'newEntryController', controllerAs: 'vm' };
            var entryDetail = { templateUrl: 'app/components/templates/entry-detail.html', controller: 'entryDetailController', controllerAs: 'vm' };
            var userManagement = { templateUrl: 'app/components/templates/user-management-tpl.html', controller: 'userManagementController', controllerAs: 'vm' };
            var support = { templateUrl: 'app/components/templates/support-tpl.html', controller: 'supportController', controllerAs: 'vm' };
            var userSettings = { templateUrl: 'app/components/templates/user-settings-tpl.html', controller: 'userSettingsController', controllerAs: 'vm' };

            // Routing definition
            $routeProvider
				.when('/', entryList)
                .when('/new-entry', newEntry)
                .when('/entry-detail/:id', entryDetail)
                .when('/user-management', userManagement)
                .when('/support', support)
                .when('/user-settings', userSettings)

                // Default route
                .otherwise({ redirectTo: '/' });
        });

})();