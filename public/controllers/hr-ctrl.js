angular
    .module('intranet')
    .controller('HRController', function($scope,$http, $sce){
        var vm = this;
        vm.ann;
        vm.pageData;
//        $http.post("dbaccess/hr-ann-get.php",{'division_name': 'Announcements'})
        $http.post("/test_endpoint")
        .success(function(data, status, headers, config){
              //console.log("status: "+status);
             //console.log("TEST:" +JSON.stringify(data));
            console.log(data);
            vm.ann=Object.values(data);

            //console.log(vm.ann);
            // console.log("status: "+status);
            // console.log("headers: "+headers);
            // console.log("config: "+config);
        });
        // $http.post("dbaccess/hr-page-get.php",{'division_name': 'Announcements'})
        // .success(function(data, status, headers, config){
        //     console.log(data);
        //     vm.pageData=data;
        //     console.log(vm.pageData);
        //
        //     $scope.dbBindHtml = $sce.trustAsHtml(vm.pageData[4]);
        //
        // });


    });
