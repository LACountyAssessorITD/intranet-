angular
  .module('intranet')
  .controller('SearchController', function($http,search_query) {
    var vm = this;
    vm.resultListPages = [];
    vm.resultListApps = [];
    vm.searchItems = [

        {
            itemTitle: "Human Resources",
            itemLink: "/hr",
            itemType: 1,
            itemImg: "/img/img01.png"
        },
        {
            itemTitle: "App 01",
            itemLink: "/forum",
            itemType: 2,
            itemImg: "/img/app01.png"
        }
    ];
    vm.app_data;


    vm.search = function() {
        var options = {
            shouldSort: true,
            threshold: 0.4,
            location: 0,
            distance: 50,
            maxPatternLength: 14,
            keys: [
                "name","url"
            ]
        };
        $http.post('/get_apps')
        .then(function(data){
            console.log(Object.values(data));
            vm.app_data = Object.values(data)[0];
            console.log("query: " + search_query);
            var fuse = new Fuse(vm.app_data, options); // "list" is the item array
            var result = fuse.search(search_query);
            //vm.app_data = fuse.search(search_query);

            console.log('searching...');
            vm.populateResults(result);
            //vm.resultsList= result;
            console.log(result);
        });

    };

    vm.populateResults = function(results){
        resultListApps = [];
        //resultListPages = [];
        for ( var i in results){
            vm.resultListApps.push(results[i]);
            // console.log(i);
            // switch(results[i].itemType){
            //     case 1:
            //     vm.resultListPages.push(results[i]);
            //     break;
            //     case 2:
            //     vm.resultListApps.push(results[i]);
            //     break;
            // }
        }
    }

    if(search_query != null){
        vm.search();
    }
  });
