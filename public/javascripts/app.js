/**
 * Created by credt on 2016-08-04.
 */

var app = angular.module("app", ['ngRoute', 'ngAnimate']);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {templateUrl : "map", controller :'mapCtrl'})
        .when("/about", {templateUrl : "about", controller: 'aboutCtrl'})
        .when("/banner", {templateUrl : "banner", controller: 'bannerCtrl'});
});

app.controller('appCtrl',function ($scope, $auth) {
    angular.element("#toggleButton").addClass("collapsed");
    $scope.menuClick = function(){
        // 작은 화면일 때 메뉴바가 닫히는 기능
        var button = angular.element("#toggleButton");
        if (!button.attr('class').includes('collapsed'))
            button.click();
    };

    $scope.toggleAuth = function(){
        if(!firebase.auth().currentUser){
            // Firebase FB Login Provider로 시작
            // 팝업창 없이 현화면에서 redirect
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithRedirect(provider).then(function (){
                $scope.showModal = false;
            });
        }
        else{
            // 로그아웃
            firebase.auth().signOut();
        }
    };
    // Authentication Initialization
    $auth.init();

    $auth.setScopeOnAuthStateChange($scope);

    // modal ctrl
    $scope.default = true;
    $scope.$on('$viewContentLoaded', function() {
        //call it here
       $scope.showModal = !$auth.checkSignedIn();
    });
  //  $scope.buttonClicked = "";
  //  $scope.toggleModal = function(btnClicked) {
  //      $scope.buttonClicked = btnClicked;
  //      $scope.showModal = !$scope.showModal;
  //  }
});

app.controller('aboutCtrl',function ($scope) {
    $scope.pageClass = 'page-about';
});

app.controller('mapCtrl', function ($scope, $compile){
    // initalize map
    initialize();

    $scope.pageClass =  'page-map';
    $scope.goToBanner = function (index){
        // get Marker's index and connect proper Banner using the index
        $rootScope.currentLocation = locations[index];
        // get posts by 

    };

    var markers = [];
    var cityCircle;
    var myPosition;

    function initialize() {
        var zoomLevel = 16;
        var geocoder = new google.maps.Geocoder();
        var gps = navigator.geolocation;
        var markerMaxWidth = 300;
        var mapOptions = {
            zoom: zoomLevel,
            center: new google.maps.LatLng(37.2834866, 127.0447932),
            //center: new google.maps.LatLng(37.2834866,127.0447932),
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var geoOptions = {
            enableHighAccuracy: true,
            maximumAge: 0
        };
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        var geoLocationDiv = document.createElement('div');
        var geoLocationControl = new GeoLocationControl(geoLocationDiv, map, geoOptions, locations);
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(geoLocationDiv);
        geoLocate(geoOptions, locations);
    }

    function GeoLocationControl(controlDiv, map, geoOptions, locations) {
        // Set CSS for the control button
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#444';
        controlUI.style.borderStyle = 'solid';
        controlUI.style.borderWidth = '1px';
        controlUI.style.borderColor = 'white';
        controlUI.style.height = '28px';
        controlUI.style.marginTop = '5px';
        controlUI.style.cursor = 'pointer';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to your location';
        controlDiv.appendChild(controlUI);
        // Set CSS for the control text
        var controlText = document.createElement('div');
        controlText.style.fontFamily = 'Arial,sans-serif';
        controlText.style.fontSize = '10px';
        controlText.style.color = 'white';
        controlText.style.paddingLeft = '10px';
        controlText.style.paddingRight = '10px';
        controlText.style.marginTop = '8px';
        controlText.innerHTML = '현재 위치 찾기';
        controlUI.appendChild(controlText);
        // Setup the click event listeners to geolocate user
        controlUI.addEventListener('click', function () {
            console.log("1");
            clearMarkers();
            geoLocate(geoOptions, locations);
        });
    }

    function geoLocate(geoOptions, locations) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                console.log("2");
                // 현재 위경도 값(GPS) 변수에 넣기.
                var latitude = pos.coords.latitude;
                var longitude = pos.coords.longitude;
                cityCircle = new google.maps.Circle({
                    center: new google.maps.LatLng(latitude, longitude),
                    //center: new google.maps.LatLng(37.2834866,127.0447932) ,
                    radius: 250,
                    strokeColor: "#000000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#808080",
                    fillOpacity: 0.5
                });
                cityCircle.setMap(map);
                // 현재 위치에 마커 생성
                myPosition = new google.maps.Marker({
                    position: new google.maps.LatLng(latitude, longitude),
                    //position: new google.maps.LatLng(37.2834866,127.0447932),
                    map: map,
                    draggable: false,
                    icon: "https://maps.google.com/mapfiles/ms/micons/man.png"
                });
                map.setCenter(new google.maps.LatLng(latitude, longitude));
                //map.setCenter(new google.maps.LatLng(37.2834866,127.0447932));
                console.log(latitude);
                console.log(longitude);

                //반경500m 이내의 마커만 표시하기
                for (index in locations) {
                    if (Math.pow(Math.abs(latitude * 100000 - locations[index].lat * 100000), 2) +
                        Math.pow(Math.abs(longitude * 100000 - locations[index].lng * 100000), 2) < 62500);
                    addMarker(locations[index], index);
                };
                function addMarker(data, index) {
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(data.latitude, data.longitude),
                        map: map,
                        title: data.title,
                        draggable: false,
                        animation: google.maps.Animation.DROP
                    });
                    markers.push(marker);
                    // Inject HTML code into marker content
                    var contentString = data.info + '' +
                        '<br><button class=" goToBannerBtn btn btn-default" ng-click="goToBanner(\''+index+'\')">Go' +
                        '</button>';
                    var infowindow = new google.maps.InfoWindow({content: contentString});
                    google.maps.event.addListener(marker, "click", function () {
                        infowindow.open(map, marker);
                        $compile(angular.element('.goToBannerBtn'))($scope)
                        //Because injected code is loaded after angularjs compiled,
                        // The code needs to be recompiled ($compile)
                    });
                };
            }, function (error) {
                switch (error.code) {
                    case 1:
                        $("#errormsg").html("User denied the request for Geolocation.");
                        break;
                    case 2:
                        $("#errormsg").html("Location information is unavailable.");
                        break;
                    case 3:
                        $("#errormsg").html("The request to get user location timed out.");
                        break;
                    case 0:
                        $("#errormsg").html("An unknown error occurred.");
                        break;
                }
            }, geoOptions);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        cityCircle.setMap(null);
        myPosition.setMap(null);
    }
});

app.controller('bannerCtrl', function ($scope) {
    var banner1 = {};
    banner1.pfPic = "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/12523187_490784281123355_9177436322547340471_n.jpg?oh=dba858b162f5ef90bdd77105405888a2&oe=58208515";
    banner1.body = "hello !";
    banner1.username = "credtiger96  ";
    banner1.date = "14:24";

    var banner2 = {};

    banner2.pfPic = "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/11885156_728851200554207_4828033296060397603_n.jpg?oh=9ac0ea1a2ab6f125f11c83a42cb516e1&oe=5825FFA0";
    banner2.body = " It's a nice day testttttttttttttttttttttttttttttttttttttttttttttttttt!";
    banner2.username = "handsome_guy  ";
    banner2.date = "15:11";

    $scope.banners = [banner1, banner2];

});

app.directive('modal', function () {
    return {
        template: '<div class="modal fade"  data-keyboard="false" data-backdrop="static">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '<h4 class="modal-title">Ajou Banner Community</h4>' +
        '</div>' +
        '<div class="modal-body" ng-transclude></div>' +
        '</div>' +
        '</div>' +
        '</div>',
        restrict: 'E',
        transclude: true,
        replace:true,
        scope:true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function(value){
                if(value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function(){
                scope.$apply(function(){
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function(){
                scope.$apply(function(){
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});

