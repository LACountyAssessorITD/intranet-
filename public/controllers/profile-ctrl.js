angular
.module('intranet')
.controller('profileCtrl', function($scope, $http) {

    var vm = this;
    vm.userProfile;
    /*
    $http.get('/loggedin').then(function(data) {
        console.log(data.data._json);
        vm.userProfile =data.data._json;
        vm.givenName = vm.userProfile.givenName;
        vm.department = vm.userProfile.department;
        vm.description = vm.userProfile.description;
        vm.displayName = vm.userProfile.displayName;
        vm.title = vm.userProfile.title;
        vm.phone = vm.userProfile.telephoneNumber;


    });
    */

    var data_received;

    http.post('/get_alerts', data_received)
    .success(function(data) {
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
});
