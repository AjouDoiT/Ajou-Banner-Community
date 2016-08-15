/**
 * Created by credt on 2016-08-15.
 */

var app = angular.module("adminApp", []);


app.service('AjaxSvc', function ($http){
    // separate http service code from app controller code using angularJS service.
    this.fetch = function (){
        return $http.get('/admin/location');
    };
    this.create = function(data){
        return $http.post('/admin/location',data);
    };
});

app.controller('adminCtrl', function ($scope, AjaxSvc) {
    AjaxSvc.fetch().then(function(data) {
        $scope.locations = data.data;
    },function (err) {
        alert('[ERROR] please see console.' + err);
        console.log(err);
    });
    $scope.addLocation = function () {
        if ($scope.location_id.trim() &&
            $scope.location_info.trim() &&
            $scope.location_title.trim() &&
            $scope.location_lat.trim() &&
            $scope.location_lng.trim()) { // if postBody(input string) is exits
            // trim() removes addtional blank space in string's tail

            var data = {
                location_id:  $scope.location_id,
                location_lat: $scope.location_lat,
                location_lng : $scope.location_lng,
                location_title:    $scope.location_title,
                location_info :   $scope.location_info
            };
            AjaxSvc.create(data)
                .then(function (res){ // if it success.
                    var element = {
                        id :res.body.location_id,
                        info : location_info,
                        lng : location_lng,
                        title : location_title,
                        lat : location_lat
                    };
                    $scope.locations.unshift(element);
                    $scope.location_id="";
                    $scope.location_info= "";
                    $scope.location_title="";
                    $scope.location_lat="";
                    $scope.location_lng="";
                },function(err){ // if it failed.
                    alert('[ERROR] please see console.' + err);
                    console .log(err);
                });
        }
    }
});