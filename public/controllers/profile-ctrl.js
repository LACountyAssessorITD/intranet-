angular
.module('intranet')
.controller('profileCtrl', function($scope, $http) {

    var vm = this;
    console.log("hello");


    var data_received;
    $scope.alerts;
    http.post('/get_alerts', data_received)
    .success(function(data) {
        console.log("getting");
        //vm.alerts = data;
        console.log(data);
        $scope.alerts = [];
        // Add alerts to angular scope
        for(var i = 0; i < data.length; i++) {
            var alert = data[i];
            //console.log(alert.type);
            $scope.alerts.push(alert.type);
       }
    });
    /*
    <!--
    <td ng-repeat="alert in alerts"><input type="checkbox" ng-checked="vm.selection.indexOf(alert) > -1" ng-click="toggleSelection(alert)">{{alert}}</td>
    -->
    */

    vm.submit = function() {
        console.log("here");
    }
});
