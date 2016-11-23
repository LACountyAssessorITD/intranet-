angular
.module('intranet')
.controller('alertCtrl', function($scope, $http) {

    var vm = this;

    var alert_data;
    /* = JSON.stringify(
        {
            'type' : ''
        }
    );
    */
    $http.post('/get_alerts', alert_data)
    .success(function(data) {
        vm.alerts = data;
        console.log(vm.alerts.name);
    });

    // TODO: TURN alert_data into array of alert types _______________________


    $scope.alerts = ['traffic', 'general'];

    // selected alert groups
    vm.selection = []

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


    // List all alert groups
    // Let user select groups


});
