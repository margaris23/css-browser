angular.module('directives', [])
.directive('cssBrowser', function () {
	return {
		scope: {
			selected: '='
		},
		template: 'Current css: {{selected}}'
	};
})
.directive('cssExtractor', ['$http', function ($http) {
	return {
		scope: {
			csslist: '='
		},
		template: '<input type="text" ng-model="url"></input><input type="button" ng-click="extract()" value="Extract"></input>',
		link: function (scope, element, attrs) {
			scope.extract = function () {
				var searchfor = '/extract?url=' + scope.url;
				// if (scope.url && scope.url.indexOf('http') === -1) {
				// 	searchfor = 'http://' + searchfor;
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
.directive('cssPicker', function () {
	return {
		scope: {
			csslist: '=',
			selected: '='
		},
		template: '<select ng-model="selected"><option ng-repeat="css in csslist" value="{{css}}">{{css}}</option></select>',
		link: function (scope) {

		}
	}
});