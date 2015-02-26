angular.module('directives', [])
.directive('cssBrowser', function () {
	return {
		template: 'Browser works!'
	};
})
.directive('cssExtractor', function () {
	return {
		template: 'Extractor works!'
	}
})
.directive('cssPicker', function () {
	return {
		template: 'Picker works!'
	}
});