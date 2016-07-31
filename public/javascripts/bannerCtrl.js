/**
 * Created by credt on 2016-07-31.
 */
var app = angular.module('banner', []);

app.controller('bannerCtrl', function ($scope) {
    var banner1 = {};
    banner1.pfPic = "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/12523187_490784281123355_9177436322547340471_n.jpg?oh=dba858b162f5ef90bdd77105405888a2&oe=58208515";
    banner1.body = "hello !";
    banner1.username = "credtiger96  ";
    banner1.date = "14:24";

    var banner2 = {};

    banner2.pfPic = "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/11885156_728851200554207_4828033296060397603_n.jpg?oh=9ac0ea1a2ab6f125f11c83a42cb516e1&oe=5825FFA0";
    banner2.body = " It's a nice day!";
    banner2.username = "handsome_guy  ";
    banner2.date = "15:11";

    $scope.banners = [banner1, banner2];

});
