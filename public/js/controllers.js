angular.module('controllers', [])
.controller('CssBrowserCtrl', ['$scope', function ($scope) {

	$scope.csslist = [];
	$scope.browser = {
	    selected: null,
	    host: null,
	    currentStyle: null,
        currentRule: null,
        cssClassParent: null,
        cssClassChild: null
	};

	$scope.applyStyle = function (toParent) {
		var sel = $scope.browser.currentRule.selectorText;
		console.log($scope.browser.currentRule);
		console.log($scope.browser.currentRule[sel]);
		$scope.browser[toParent ? 'cssClassParent' : 'cssClassChild'] = $scope.browser.currentRule[sel];
	};

	console.log('CssBrowserCtrl loaded...');
}]);
