/**
 * Created by credt on 2016-08-15.
 */

var app = angular.module("admin", []);


app.service('AdminSvc', function ($http){
    // separate http service code from app controller code using angularJS service.
    this.fetch = function (){
        return $http.get('api/admin/spot');
    };
    this.create = function(post){
        return $http.post('api/admin/spot', post);
    };
});

app.controller('adminCtrl', function ($scope, AjaxSvc) {
    AjaxSvc.fetch().then(function(data) {
        $scope.locations = data.data;
    },function (err) {
        alert('[ERROR] please see console.');
        console.log(err);
    })
    $scope.addPost = function () {
        if ($scope.location_id.trim() &&
            $scope.location_info.trim() &&
            $scope.location_title.trim() &&
            $scope.location_lat.trim() &&
            $scope.location_lng.trim()) { // if postBody(input string) is exits
            // trim() removes addtional blank space in string's tail

            AdminSvc.create({
                username: UserSvc.getUser().username,
                body: $scope.postBody
            })
                .then(function (res){ // if it success.
                    $scope.posts.unshift(res.data);
                    $scope.postBody = null;// clear input box
                },function(err){ // if it failed.
                    $scope.posts.splice(0,1);
                    console .log(err);
                });
        }
    }
});