angular.module('controllers', [])
.controller('CssBrowserCtrl', ['$scope', function ($scope) {

	$scope.csslist = [];
	$scope.selected;

	console.log('CssBrowserCtrl loaded...');
}]);