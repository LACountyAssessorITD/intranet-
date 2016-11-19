angular
.module('intranet')
.controller('profileCtrl', function($scope, $http) {

    var vm = this;
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

});
