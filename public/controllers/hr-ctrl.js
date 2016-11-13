angular
    .module('intranet')
    .controller('HRController', function($scope,$http, $sce){
        //vm is referring to "THIS" like java/c++ this.something.
        var vm = this;

        /*
        * vm.ann       -> announcement content
        * vm.page_data -> page content
                            [0]id
                            [1]img_01
                            [2]img_02
                            [3]img_03
                            [4]heading_01
                            [5]heading_02
                            [6]body_01
                            [7]body_02
                            [8]video_01
                            [9]video_02
                            [10]name
        *
        *
        */
        vm.ann;
        vm.page_data;
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

        var post_data = JSON.stringify(
            {
                'page_id' : 1
            }
        )
        $http.post('/get_page', post_data)
        .success(function(data){
            //console.log(Object.values(data));
            vm.page_data = Object.values(data);
        })


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
