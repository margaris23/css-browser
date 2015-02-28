angular.module('directives', [])
.directive('cssBrowser', function () {
    return {
        scope: {
            currentStyle: '='
        },
        template: 'Current css: {{currentStyle}}',
        link: function (scope) {
            
        }
    };
})
.directive('cssExtractor', ['$http', function ($http) {
    return {
        scope: {
            csslist: '=',
            host: '='
        },
        template: '<input type="text" ng-model="host"></input><input type="button" ng-click="extract()" value="Extract"></input>',
        link: function (scope, element, attrs) {
            scope.extract = function () {
                var searchfor = '/extract?url=' + scope.host;
                // if (scope.url && scope.url.indexOf('http') === -1) {
                //  searchfor = 'http://' + searchfor;
                // }
                $http.get(searchfor).success(function (reply) {
                    scope.csslist = reply.css || [];
                }).error(function (error) {
                    console.error('ERROR: ' + error);
                });
            };
        }
    }
}])
.directive('cssPicker', ['$http', '$timeout', function ($http, $timeout) {
    return {
        scope: {
            csslist: '=',
            selected: '=',
            host: '=',
            currentStyle: '='
        },
        templateUrl: 'partials/picker.html',
        link: function (scope) {

            var styles = [];

            scope.$watch('selected', function (val) {
                if (!val) {
                    return;
                }

                //var delim = (val.charAt(0) === '/') ? '' : '/'
                
                var hostEnd = (scope.host.charAt(scope.host.length-1) === '/');
                var searchfor = '/retrieve?css=' + scope.host;

                if (val.charAt(0) === '/') {
                    if (hostEnd) {
                        searchfor = searchfor + val.substr(1);
                    } else {
                        searchfor = searchfor + val;
                    }
                } else {
                    if (!hostEnd) {
                        searchfor = searchfor + '/' + val;
                    } else {
                        searchfor = searchfor + val;
                    }
                }

                console.log('Request for: ' + searchfor);
                $http.get(searchfor).success(function (reply) {
                    if (reply.data) {
                        $timeout(function (){
                            scope.currentStyle = reply.data;
                        });
                    }
                }).error(function (error) {
                    console.error('ERROR: ' + error);
                });
            });
        }
    }
}]);