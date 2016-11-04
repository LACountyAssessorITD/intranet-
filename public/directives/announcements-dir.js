angular
.module('intranet', [])
.controller('Ann-Dir-Ctrl', ['$scope', function($scope) {
    $scope.announcement = {
        title: 'Naomi',
        body: '1600 nignog'
    };
}])
.directive('intra-hr-announcement', function() {
    return {
        restrict: 'E',
        scope: {
            custo
        }
        templateUrl: 'templates/annDir.html'
    };
});
