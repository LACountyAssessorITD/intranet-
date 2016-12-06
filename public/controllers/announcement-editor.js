angular
    .module('intranet')
    .controller('AnnouncementEditor', function($scope,$http,resolve_division_id){
        var vm = this;

        //RETRIEVE DATA FOR THE PAGE
        vm.ann;


        var announcement_data = JSON.stringify(
            {
                'division_id' : resolve_division_id
            }
        );
        $http.post('/get_announcement', announcement_data)
        .success(function(data){
              //console.log("status: "+status);
             //console.log("TEST:" +JSON.stringify(data));
            //console.log(data);
            vm.ann=data;
            console.log(vm.ann);
            // console.log("status: "+status);
            // console.log("headers: "+headers);
            // console.log("config: "+config);
        });
        //
        //
        // //SUBMIT POST REQUEST to UPDATE an announcement into the database
        // vm.submitUpdate = function(){
        //     $http.post("dbaccess/hr-ann-update.php",{'ann_idx_id':vm.ann[0],'title_ann': $scope.annTitle, 'content_ann': $scope.announceContent})
        //     .success(function(data, status, headers, config){
        //         console.log("data: "+data);
        //         console.log("status: "+status);
        //         console.log("headers: "+headers);
        //         console.log("config: "+config);
        //     });
        // }
        //
        // vm.submitDeletion = function(){
        //     $http.post("dbaccess/hr-ann-delete.php",{'ann_idx_id':vm.ann[0]})
        //     .success(function(data, status, headers, config){
        //         console.log("data: "+data);
        //         console.log("status: "+status);
        //         console.log("headers: "+headers);
        //         console.log("config: "+config);
        //         vm.refreshAnn();
        //     });
        // }
        //
        // vm.refreshAnn = function(){
        //     $http.post("dbaccess/hr-ann-get.php",{'division_name': 'Announcements'})
        //     .success(function(data, status, headers, config){
        //         console.log(data);
        //         vm.ann=data;
        //         console.log(vm.ann);
        //         $scope.annTitle = vm.ann[1];
        //         $scope.announceContent = vm.ann[2];
        //     });
        // }

            //vm.refreshAnn();
    });
