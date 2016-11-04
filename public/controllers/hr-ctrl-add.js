angular
    .module('intranet')
    .controller('HRAddController', function($scope,$http){
        var vm = this;


        //SUBMIT POST REQUEST to insert an announcement into the database
        vm.submit = function(){
            console.log("file: "+__filename);
            $http.post("dbaccess/insertAnn.php",{'title_ann': $scope.annTitle, 'content_ann': $scope.announceContent})
            .success(function(data, status, headers, config){
                console.log("data: "+data);
                console.log("status: "+status);
                console.log("headers: "+headers);
                console.log("config: "+config);
            });
        }
    });
