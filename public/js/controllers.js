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
		var rule = JSON.parse($scope.browser.currentRule)
		$scope.browser[toParent ? 'cssClassParent' : 'cssClassChild'] = rule[rule.selectorText];
	};

	console.log('CssBrowserCtrl loaded...');
}]);
