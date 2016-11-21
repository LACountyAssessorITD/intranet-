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


    $scope.fruits = ['apple', 'orange', 'pear', 'naartjie'];

    // selected fruits
    $scope.selection = ['apple', 'pear'];
    vm.selected = []
    //console.log($scope.selection);
    // toggle selection for a given fruit by name
    $scope.toggleSelection = function toggleSelection(fruitName) {
      var idx = $scope.selection.indexOf(fruitName);

      // is currently selected
      if (idx > -1) {
        $scope.selection.splice(idx, 1);
        console.log($scope.selection);
      }

      // is newly selected
      else {
        $scope.selection.push(fruitName);
        console.log($scope.selection);
      }
      vm.selected = $scope.selction;
      console.log(vm.selected);
    };

    // Submit alert to node
    vm.submit = function() {
        //console.log();
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


});
