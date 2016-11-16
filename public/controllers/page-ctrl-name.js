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
        // .then(function(data){
        //     console.log(Object.values(data));
        //     if(data[0] == ""){
        //         console.log("FUK");
        //         $location.path( "/" );
        //         $route.reload();
        //         return -1;
        //     }else{
        //         console.log('IN THEN');
        //         return data[0];
        //     }
        $q.when(resolve_page_name).then(
            function (result){
            //    console.log("result:"+result);
                if(result == null){
                    console.log("u fuked up");
                }else{
                    vm.load_page();
                }
        });
        vm.load_page = function (){
            vm.ann;
            vm.page_data = resolve_page_name.data;
            var announcement_data = JSON.stringify(
                {
                    'division_id' : 0
                }
            );
            $http.post('/get_announcement', announcement_data)
            .success(function(data){
                vm.ann=data;
                vm.ann.date_created = new Date(vm.ann.date_created).toDateString();
                //console.log(vm.ann);
            });

            //Fetching the particular page. and send the page_id as payload data to
            //the endpoint which in turn fetches from the DB with the page ID.
            var post_data = JSON.stringify(
                {
                    'page_id' : vm.page_data.id
                }
            );
            $http.post('/get_page', post_data)
            .success(function(data){
                //console.log(Object.values(data));
                vm.page_data = data;
            });
        }


    });
