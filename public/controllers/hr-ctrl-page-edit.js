angular
    .module('intranet')
    .controller('HRPageEditController', function($scope,$http){
        var vm = this;

        //RETRIEVE DATA FOR THE PAGE
        vm.pageData;


        //SUBMIT POST REQUEST to UPDATE an announcement into the database
        vm.updatePage = function(){
            $http.post("dbaccess/hr-page-edit.php",{'heading': $scope.heading, 'body': $scope.body_content, photo_link:$scope.photo_link,video_link:$scope.video_link,pure_html:$scope.pure_html})
            .success(function(data, status, headers, config){
                console.log("data: "+data);
                console.log("status: "+status);
                console.log("headers: "+headers);
                console.log("config: "+config);
                vm.refreshPage();
            });
        }

        vm.refreshPage = function(){
            $http.post("dbaccess/hr-page-get.php")
            .success(function(data, status, headers, config){
                console.log(data);
                vm.pageData=data;
                $scope.heading= vm.pageData[0];
                $scope.body_content = vm.pageData[1];
                $scope.photo_link = vm.pageData[2];
                $scope.video_link = vm.pageData[3];
                $scope.pure_html = vm.pageData[4];
            });
        }

            vm.refreshPage();
    });
