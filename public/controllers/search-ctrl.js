angular
  .module('intranet')
  .controller('SearchController', function(search_query) {
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


    vm.search = function() {
        var options = {
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            keys: [
                "itemTitle"
            ]
        };
        console.log("query: " + search_query);
        var fuse = new Fuse(vm.searchItems, options); // "list" is the item array
        var result = fuse.search(search_query);
        console.log('searching...');
        vm.populateResults(result);
        //vm.resultsList= result;
        console.log(result);
    };

    vm.populateResults = function(results){
        resultListApps = [];
        resultListPages = [];
        for ( var i in results){
            console.log(i);
            switch(results[i].itemType){
                case 1:
                vm.resultListPages.push(results[i]);
                break;
                case 2:
                vm.resultListApps.push(results[i]);
                break;
            }
        }
    }

    if(search_query != null){
        vm.search();
    }
  });
