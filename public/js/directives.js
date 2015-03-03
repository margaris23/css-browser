angular.module('directives', [])
.directive('cssBrowser', function () {
    return {
        scope: {
            currentStyle: '=',
            currentRule: '='
        },
		template: '<p>Current css: {{currentStyle}}</p><p>Current rule: {{currentRule}}</p>',
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
        templateUrl: 'partials/extractor.html',
        link: function (scope, element, attrs) {
            scope.extract = function () {
                var searchfor = '/extract?url=' + scope.host;
                // if (scope.url && scope.url.indexOf('http') === -1) {
                //  searchfor = 'http://' + searchfor;
                // }
                $http.get(searchfor).success(function (reply) {
                    scope.csslist = reply.css || [];
                }).error(function (error) {
                    console.log('ERROR: ' + error);
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
            currentStyle: '=',
            currentRule: '='
        },
        templateUrl: 'partials/picker.html',
        link: function (scope) {

            var styles = [];
            scope.rules = [];

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

                //searchfor += '?callback=JSON_CALLBACK';

                console.log('Request for: ' + searchfor);
                $http.get(searchfor).success(function (reply) {
                    if (reply.cssRules) {
                        $timeout(function (){
                            scope.rules = reply.cssRules;
                        });
                    }
                }).error(function (error) {
                    console.log('ERROR: ' + error);
                });
            });

            scope.selectCSSFile = function(indx) {
                scope.selected = scope.csslist[indx];
            };

            scope.selectRule = function(indx) {
                scope.currentRule = scope.rules[indx];
            };
        }
    }
}]);
