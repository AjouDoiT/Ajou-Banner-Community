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
    this.delete = function(id) {
        return $http.delete('/admin/location', {params :{_id : id} });
    }
});

app.filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
    }
}]);

app.controller('adminCtrl', function ($scope, AjaxSvc) {
    AjaxSvc.fetch().then(function(data) {
        $scope.locations = data.data;
    },function (err) {
        alert('[ERROR] please see console.' + err);
        console.log(err);
    });
    $scope.addLocation = function () {
        
        if ($scope.location_id.trim() &&
            $scope.info.trim() &&
            $scope.title.trim() &&
            $scope.latitude.trim() &&
            $scope.longitude.trim()) { // if postBody(input string) is exits
            // trim() removes addtional blank space in string's tail

            var data = {
                location_id:  $scope.location_id,
                latitude: $scope.latitude,
                longitude : $scope.longitude,
                title:    $scope.title,
                info :   $scope.info
            };
            AjaxSvc.create(data)
                .then(function (res){ // if it success.
                    var element = {
                        location_id :res.data.location_id,
                        info :  res.data.info,
                        longitude : res.data.longitude,
                        title : res.data.title,
                        latitude : res.data.latitude
                    };
                    $scope.locations.push(element);
                    $scope.location_id="";
                    $scope.info= "";
                    $scope.title="";
                    $scope.latitude="";
                    $scope.longitude="";
                },function(err){ // if it failed.
                    alert('[ERROR] please see console.' + err);
                    console.log(err);
                });
        }
    }
    $scope.deleteLocation = function ($index){
        AjaxSvc.delete($scope.locations[$index]._id)
            .then(function(data){
                $scope.locations.splice($index, 1);
            },function(err){
                alert('[ERROR] please see console.' + err);
            });

    }
});