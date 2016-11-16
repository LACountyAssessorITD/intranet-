angular
.module('intranet')
.controller('PageEditor', function($scope,$http,resolve_pageid){
    console.log("page id:"+resolve_pageid);
    var vm = this;

    /*Upon page editor load:
    * 1.) Get the page and all the data needed to fill edit boxes
    * 2.) When data is filled in , have separate function to update
    */
    /*
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
                        [11]theme
    *
    *
    */
    vm.page_data;// page data from $http.post
    var post_data = JSON.stringify(
        {
            'page_id' : resolve_pageid
        }
    );
    $http.post('/get_page', post_data)
    .success(function(data){
        console.log(Object.values(data));
        vm.page_data = Object.values(data);
        vm.name = vm.page_data[1];
        vm.img_01 = vm.page_data[2];
        vm.img_02 = vm.page_data[3];
        vm.img_03 = vm.page_data[4];
        vm.heading_01 = vm.page_data[5];
        vm.heading_02 = vm.page_data[6];
        vm.body_01 = vm.page_data[7];
        vm.body_02 = vm.page_data[8];
        vm.video_01 = vm.page_data[9];
        vm.video_02 = vm.page_data[10];
        vm.theme = vm.page_data[11];
        vm.editorVal= vm.page_data[11];
        vm.url = vm.page_data[12];

    });

    vm.update_page = function(){
        var payload =
        {
            'img_01' : vm.img_01,
            'img_02' : vm.img_02,
            'img_03' : vm.img_03,
            'heading_01' : vm.heading_01,
            'heading_02' : vm.heading_02,
            'body_01' : vm.body_01,
            'body_02' : vm.body_02,
            'video_01' : vm.video_01,
            'video_02' : vm.video_02,
            'theme'  : vm.theme,
            'url'  :vm.url,
            'name' : vm.name,
            'id' : vm.page_data[0]
        };
        //console.log(payload);
        $http.post('/update_page', payload)
        .success(function(data,status,headers,config){
            console.log("SUCCESS");
        });
    }
});
