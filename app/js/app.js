'use strict';

var app = angular.module('app', ['ngRoute', 'appControllers', 'appServices', 'appDirectives', 'xeditable']);

var appServices = angular.module('appServices', []);
var appControllers = angular.module('appControllers', []);
var appDirectives = angular.module('appDirectives', []);

var options = {};
options.api = {};
options.api.base_url = "http://localhost:3001";


app.config(['$locationProvider', '$routeProvider', 
  function($location, $routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/lists.html',
            controller: 'listController'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);

app.run(function(editableOptions){
    editableOptions.theme = 'bs3';
})