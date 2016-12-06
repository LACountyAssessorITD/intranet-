angular
.module('intranet')
.controller('alertCtrl', function($scope, $http) {

    var vm = this;
    //var alert_data;
    $scope.alerts;
    var data_received;
    // Get alerts from db
    $http.post('/get_alerts', data_received)
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

    // selected alert groups
    vm.selection = [];

    // toggle selection for a given alertType by name
    $scope.toggleSelection = function toggleSelection(alertType) {

      var idx = vm.selection.indexOf(alertType);

      // is currently selected
      if (idx > -1) {
        vm.selection.splice(idx, 1);
        console.log(vm.selection);
      }

      // is newly selected
      else {
        vm.selection.push(alertType);
        console.log(vm.selection);
      }
    };

    // Submit alert to node
    vm.submit = function() {

        //console.log(vm.selection);

        var post_data = JSON.stringify(
            {
                'to' : vm.selection,
                'subject' : $scope.subject,
                'body' : $scope.body
            }
        );

        $http.post('/submit_alert', post_data)
        .success(function(data, status, headers, config) {
            console.log("Posted successfully");
        }).error(function(data, status, headers, config) {
            console.error(data);
            console.error(status);
            console.error(headers);
            console.error(config);
        })
    }
    /*
    var vm = this;
    // Submit alert too node
    vm.submit = function() {

        var post_data = JSON.stringify(
            {
                'to' : $scope.to,
                'subject' : $scope.subject,
                'body' : $scope.body
            }
        );
        //console.log(post_data);
        $http.post('/submit_alert', post_data)
        .success(function(data, status, headers, config) {
            console.log("Posted successfully");
        }).error(function(data, status, headers, config) {
            console.error(data);
            console.error(status);
            console.error(headers);
            console.error(config);
        })
    }


    // List all alert groups
    // Let user select groups

    */
});
