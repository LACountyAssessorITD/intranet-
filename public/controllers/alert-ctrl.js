angular
.module('intranet')
.controller('alertCtrl', function($scope, $http) {
    console.log("here");
    // Submit alert too node
    vm.submit = function() {
        $http.post("/submit_alert", {'subject': vm.alert.subject, 'body': vm.alert.body})
        .success(function(data) {
            console.log("Posted successfully");
        }).error(function(data) {
            console.error("Error posting");
        })
    }

});
