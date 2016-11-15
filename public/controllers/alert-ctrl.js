angular
.module('intranet')
.controller('alertCtrl', function($scope, $http) {
    console.log("here");
    var vm = this;
    // Submit alert too node
    vm.submit = function() {

        var post_data = JSON.stringify(
            {
                'subject' : $scope.alert.subject,
                'body' : $scope.alert.body
            }
        );
        console.log(post_data);
        $http.post('/submit_alert', post_data)
        .success(function(data) {
            console.log("Posted successfully");
        }).error(function(data) {
            console.error("Error posting");
        })
    }

});
