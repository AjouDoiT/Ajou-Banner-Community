/**
 * Created by credt on 2016-08-04.
 */

var app = angular.module("app", ['ngRoute', 'ngAnimate']);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {templateUrl : "map", controller: 'mapCtrl'})
        .when("/about", {templateUrl : "about", controller: 'aboutCtrl'});
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
});

app.controller('aboutCtrl',function ($scope) {
    $scope.pageClass = 'page-about';
});