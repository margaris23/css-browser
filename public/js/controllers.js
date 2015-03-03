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
		var rule = $scope.browser.currentRule;
		if (!rule) {
			return;
		}
		$scope.browser[toParent ? 'cssClassParent' : 'cssClassChild'] = rule[rule.selectorText];
	};

	console.log('CssBrowserCtrl loaded...');
}]);
