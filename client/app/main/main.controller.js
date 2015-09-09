'use strict';

angular.module('meanDemoApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
    $scope.tweets = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      
      var newThing = { name: $scope.newThing };
      
      $http.post('/api/things', newThing).then(function(res) {
        $scope.awesomeThings.push(res.data);
      });                            
            
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      _.remove($scope.awesomeThings, {_id: thing._id});
      $http.delete('/api/things/' + thing._id);
    };
    
    socket.syncUpdates('tweets', $scope.tweets);

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('tweets');
    });
  });
