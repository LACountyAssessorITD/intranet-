angular
    .module('intranet')
    .controller('PageControllerName', function($location,$scope,$http, $sce,$q, resolve_page_name){
        //vm is referring to "THIS" like java/c++ this.something.
        var vm = this;
        //console.log("VAL:"+resolve_page_name);

        // Now we need to send the http post and wait for that promise to resolve before continuing

        /*
        Access elements in the corresponding JSON data by
        #vm.ann.heading
        #vm.page_data.video_01
        * vm.ann       -> announcement content
                            [1]heading
                            [2]content
                            [3]date_created
        * vm.page_data -> page content
                            [0]id
                            [1]name
                            [2]img_01
                            [3]img_02
                            [4]img_03
                            [5]heading_01
                            [6]heading_02
                            [7]body_01
                            [8]body_02
                            [9]video_01
                            [10]video_02
                            [11]style
                            [12]url
        *
        *
        */

        $q.when(resolve_page_name).then(
            function (result){
                if(result == -1){
                    console.log("u fuked up");
                }
        });
        if(resolve_page_name.length == 0 ){
            //no page exists at that name, so now we need to redirect back to the
            $location.path( "/" );
        }
        vm.ann;
        vm.page_data;

        var announcement_data = JSON.stringify(
            {
                'division_id' : 0
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

        // //Fetching the particular page. and send the page_id as payload data to
        // //the endpoint which in turn fetches from the DB with the page ID.
        // var post_data = JSON.stringify(
        //     {
        //         'page_id' : 1
        //     }
        // );
        // $http.post('/get_page', post_data)
        // .success(function(data){
        //     //console.log(Object.values(data));
        //     vm.page_data = data;
        // });

    });
