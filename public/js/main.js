//name of module and array of dependent modules
angular
    .module('intranet', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/',{
                templateUrl: '/templates/index.html',
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
            .when('/page-edit/:page_id', {
                templateUrl:'/templates/page-editor.html',
                controller: 'PageEditor',
                controllerAs: 'vm',
                resolve: {
                    resolve_pageid: function($route,$location){
                        var page_id = $route.current.params.page_id;
                        return page_id;
                    }
                }
            })
            .when('/announcement-edit/:division_id', {
                templateUrl:'/templates/announcement-editor.html',
                controller: 'AnnouncementEditor',
                controllerAs: 'vm',
                resolve: {
                    resolve_division_id: function($route){
                        var division_id = $route.current.params.division_id;
                        return division_id;
                    }
                }
            })
            .when('/alerts', {
                templateUrl: '/templates/alerts.html',
                controller: 'alertCtrl',
                controllerAs: 'vm'
            })
            .when('/hr', {
                templateUrl: '/templates/hr/hr-main.html',
                controller: 'PageController',
                controllerAs: 'vm'
            })
            .when('/alerts', {
                templateUrl: '/templates/alerts.html',
                controller: 'alertCtrl',
                controllerAs: 'vm'
            });

            // .when('/hr-add-ann', {
            //     templateUrl: '/templates/hr/announcements/hr-add.html',
            //     controller: 'HRAddController',
            //     controllerAs: 'vm'
            // })
            // .when('/hr-page-edit', {
            //     templateUrl:'/templates/hr/hr-main-edit.html',
            //     controller: 'HRPageEditController',
            //     controllerAs: 'vm'
            // })
            // .when('/hr-ann-edit', {
            //     templateUrl: '/templates/hr/announcements/ann-list.html',
            //     controller: 'HREditController',
            //     controllerAs: 'vm'
            // });

            // use the HTML5 History API
            $locationProvider.html5Mode(true);
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

    //console.log("here");
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
