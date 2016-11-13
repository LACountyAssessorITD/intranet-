//name of module and array of dependent modules
angular
    .module('intranet', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl: '/templates/index.html',
                resolve: {
                //    populateSidebar(1);
                }
                // controller: 'SongsSearchController',
                // controllerAs: 'vm'
            })
            .when('/search/:query',{
                templateUrl: '/templates/search.html',
                controller: 'SearchController',
                controllerAs: 'vm',
                resolve: {
                    search_query: function ($route, $location){
                        var query = $route.current.params.query;
                        return query;
                    }
                }
            })
            .when('/forms', {
                templateUrl: '/templates/forms.html',
            })
            .when('/contact', {
                templateUrl: '/templates/contact.html',
            })
            .when('/mserv', {
                templateUrl: '/templates/management_services.html',
            })
            .when('/hr', {
                templateUrl: '/templates/hr/hr-main.html',
                controller: 'HRController',
                controllerAs: 'vm'
            })
            .when('/hr-add-ann', {
                templateUrl: '/templates/hr/announcements/hr-add.html',
                controller: 'HRAddController',
                controllerAs: 'vm'
            })
            .when('/hr-page-edit', {
                templateUrl:'/templates/hr/hr-main-edit.html',
                controller: 'HRPageEditController',
                controllerAs: 'vm'
            })
            .when('/hr-ann-edit', {
                templateUrl: '/templates/hr/announcements/ann-list.html',
                controller: 'HREditController',
                controllerAs: 'vm'
            });
            // .when('/server/insertAnn',{
            //     templateUrl: '/templates/insertAnn.php'
            // });
            // use the HTML5 History API
            //locationProvider.html5Mode(true);
    })
.controller('HomeController', function($location) {
    var vm = this;
    vm.sideBar = [];
    vm.sidebarHR = [
        {
            linkTitle: "Admin Memos",
            linkUrl: ""
        },
        {
            linkTitle: "Career",
            linkUrl: ""
        },
        {
            linkTitle: "FAQ",
            linkUrl: ""
        },
        {
            linkTitle: "News",
            linkUrl: ""
        },
        {
            linkTitle: "Forms",
            linkUrl: ""
        },
        {
            linkTitle: "Employees",
            linkUrl: ""
        },
        {
            linkTitle: "Management Services",
            linkUrl: ""
        }
    ];

    console.log("here");
    vm.searchBox = function(eventCode){
        if(eventCode == 13){
            $location.path('/search/'+vm.searchQuery);
        }
    };

    vm.populateSidebar = function(pageCode){
        switch(pageCode){
            case 1:
                break;
            case 2:
                break;
            case 4:
                console.log("hr bar links");
                sideBar=vm.sidebarHR.slice();
                sideBar.reverse();
                break;
        }
    }
});
// Additional JS for the Meu
$(".link-element a").mouseover(function() {
    //$(".link-element").css("border","none");
    $(this).css( "border", "1px solid white" );
});

$(".link-element").mouseleave(function() {
    $(".link-element a").css("border","none");
});

// var example1 = $('.newsticker').newsTicker({
//     row_height: 64,
//     speed: 800,
//     prevButton:  $('#prev-button'),
//     nextButton:  $('#next-button'),
//     stopButton:  $('#stop-button'),
//     startButton: $('#start-button')
// });
