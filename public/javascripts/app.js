/**
 * Created by credt on 2016-08-04.
 */

var app = angular.module("app", ['ngRoute', 'ngAnimate']);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {templateUrl : "main", controller: 'mainCtrl'})
        .when("/about", {templateUrl : "templates/about.html"})
        .when("/banner", {templateUrl : "banner", controller : 'bannerCtrl'})
        .when("/contact", {templateUrl : "templates/contact.html"})
        .when("/faq", {templateUrl : "templates/faq.html"});
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
            firebase.auth().signInWithRedirect(provider);
        }
        else{
            // 로그아웃
            firebase.auth().signOut();
        }
    };
    
    // Authentication Initializaiotn
    $auth.init();

});

/**
 * Created by credt on 2016-07-31.
 */
app.controller('mainCtrl', function ($scope){
    $scope.pageClass = 'page-main'
});
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
