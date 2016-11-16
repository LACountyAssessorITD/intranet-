angular
.module('intranet')
.controller('alertCtrl', function($scope, $http) {

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


});
