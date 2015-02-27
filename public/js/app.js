var myApp = angular.module('myApp', ['ui.router', 'directives', 'controllers']);

myApp.config(function($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise("index");

$stateProvider
    .state('index', {
      url: "",
      views: {
        "previewPane": {
          templateUrl: "partials/previewPane.html"
        },
        "sidePane": {
          templateUrl: "partials/sidePane.html"
        }
      }
    });
});