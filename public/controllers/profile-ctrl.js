angular
.module('intranet')
.controller('profileCtrl', function($scope, $http) {

    var vm = this;
    /*
    vm.userProfile;
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
    // TEST PURPOSES ONLY ========================================
    vm.email = 'example@yahoo.com';


    $scope.alerts;
    var data_received;
    // Get alerts from db
    $http.post('/get_alerts', data_received)
    .success(function(data) {
        //vm.alerts = data;
        //console.log(data);
        $scope.alerts = [];
        // Add alerts to angular scope
        for(var i = 0; i < data.length; i++) {
            var alert = data[i];
            //console.log(alert.type);
            $scope.alerts.push(alert.type);
        }
    });

    $http.post('/get_subscriptions', JSON.stringify({'email' : vm.email}))
    .success(function(data) {
        //console.log(data);
        for(var i = 0; i < data.length; i++) {
            $scope.toggleSelection(data[i].alertType);
            //console.log(data[i].alertType);
        }
    });

    // selected alert groups
    vm.selection = [];

    // toggle selection for a given alertType by name
    $scope.toggleSelection = function toggleSelection(alertType) {

      var idx = vm.selection.indexOf(alertType);
      // is currently selected
      if (idx > -1) {
        vm.selection.splice(idx, 1);
        //console.log(vm.selection);
      }
      // is newly selected
      else {
        vm.selection.push(alertType);
        //console.log(vm.selection);
      }
    };

    vm.save = function() {
        //console.log(vm.selection);
        var post_data = JSON.stringify(
            {
                'email' : vm.email,
                'alerts' : vm.selection
            }
        );
        console.log(post_data);
        $http.post('/subscribe', post_data)
        .success(function(data, status, headers, config) {
            console.log("Posted successfully");
        }).error(function(data, status, headers, config) {
            console.error(data);
            console.error(status);
            console.error(headers);
            console.error(config);
        })
    }
});
