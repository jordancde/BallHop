// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    var successCallback = function (user) {
        console.log(user);
    };
    var failureCallback = function (data) {
        console.log(data);
    };
    //gamecenter.auth(successCallback, failureCallback);
    ball = new ui.Actor('.ball');
    var morphAnimation = new ui.Tween({
        values: {           
            height: '17vh',
            width: '17vh',
            'margin-left': '-8.5vh',
        },
        duration: 800,      
    });
    ball.start(morphAnimation);
    $('.ball').animate({opacity: "100", leaveTransforms:true, useTranslate3d:true }, 600, function() {
             $('.scorediv').animate({opacity: "100", leaveTransforms:true, useTranslate3d:true }, 550);
    });

    var num_threads = 2;
    var MT = new Multithread(num_threads);
    var gameAuth = MT.process(
        function() { return "Logged in"; },
        function(r) { gamecenter.auth(successCallback, failureCallback);console.log(r) }
    );
    gameAuth();

 });
  
})
.controller('AppCtrl', function($scope) {

    var successCallback = function (data) {
        console.log('Success');
    };
    var failureCallback = function (data) {
        console.log('Fail');
    };
    $scope.score = function() {
        var data = {
            score: window.localStorage['highscore'],
            leaderboardId: 'ballhopscore'
        };
        gamecenter.submitScore(successCallback, failureCallback, data);
    };
    $scope.achieve = function() {
        var data = {
            achievementId: window.localStorage['achievement'],
            percent: '100'
        };
        gamecenter.reportAchievement(successCallback, failureCallback, data);
    };
    $scope.showGC = function() {
        var data = {
            leaderboardId: 'ballhopscore'
        };
        gamecenter.showLeaderboard(successCallback, failureCallback, data);
    };
});


