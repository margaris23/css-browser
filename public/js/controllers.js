angular.module('controllers', [])
.controller('CssBrowserCtrl', ['$scope', function ($scope) {

	$scope.csslist = [];
	$scope.browser = {
		selected: null,
		host: null,
		currentStyle: null
	};

	console.log('CssBrowserCtrl loaded...');
}]);