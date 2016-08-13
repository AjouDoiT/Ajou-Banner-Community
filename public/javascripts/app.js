/**
 * Created by credt on 2016-08-04.
 */

var app = angular.module("app", ['ngRoute', 'ngAnimate']);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {templateUrl : "main", controller: 'mainCtrl'})
        .when("/map", {templateUrl : "map", controller: 'mapCtrl'})
        .when("/banner", {templateUrl : "banner", controller : 'bannerCtrl'});
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
    // Authentication Initializaiotn
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

/**
 * Created by credt on 2016-07-31.
 */
app.controller('mainCtrl', function ($scope, $auth, $http){
    // for animation
    $scope.pageClass = 'page-main';

    $scope.logout = function () {
        firebase.auth().signOut();
    }

    $scope.ck = function () {
        alert($auth.checkSignedIn());
        $scope.postCheck();
    };

    /**
     * Post 보내는 상황을 가정하고 스크립트 짜봄
     * firebase.auth().currentUser.getToken을 미들웨어 삼아
     * 토큰이랑 내용물만 보내면 됨
     * 다만, 앵귤러 http 서비스는 http를 기본적으로 사용하기 때문에
     * https 프로토콜을 명시해줘야함
     */
    $scope.postCheck = function(){
        firebase.auth().currentUser.getToken(false).then(function(idToken){
            /**
             * 사용자 정보는 jwt만 포함해주면 됨
             * body에 내용만 실어서 보내버리면 끝!
             */
            var input = {
                jwt: idToken,
                body: "Hey folks"
            };
            $http.post('https://localhost:3000/send', input).success(function(response){
                console.log(response);
            }).error(function(error){
                console.log(error);
            });
        }).catch(function(error){
            console.log(error);
            // Handle error
        });
    }
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

app.controller('mapCtrl',function ($scope) {
    $scope.pageClass = 'page-map';
})

app.controller('bannerCtrl', function ($scope) {

    $scope.pageClass = 'page-banner';
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