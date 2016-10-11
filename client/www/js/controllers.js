angular.module('starter.controllers', ['ngCookies'])

.controller('DashCtrl',  function($scope, $http, $cookies) {
  $http.get('http://api.randomuser.me/').then(function(resp){
    $scope.data = resp.data.results[0];
    $scope.cookies = $cookies.get('username');
  });
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $http) {
  $http.get('http://api.randomuser.me/').then(function(resp){
    $scope.data = resp.data.results[0];
  });
})

.controller('SearchCtrl', function($scope, $http) {
    $scope.$on('$ionicView.enter', function(){
      // This event handler is activated when the view is entered.
      // So we can for example ask a data reload each time
      $http.get('http://api.randomuser.me/').then(function(resp){
        $scope.data = resp.data.results[0];
      });
    });
  })

.controller('LoginCtrl', function($scope, User, $ionicPopup, $ionicHistory, $state, $cookies) {
  $scope.user = {
    name: "",
    password: ""
  };
  $scope.login = function()
  {
    User.login($scope, $scope.user.name, $scope.user.password, $cookies).then(function(){
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('tab.dash');
    }).catch(function(){
      var alertPopup = $ionicPopup.alert({
        title: 'Login fail',
        template: 'Incorrect username or password'
      });
    });
  }
})

  .controller('RegisterCtrl', function($scope, $location, Data) {
    $scope.saveData = function(data) {
      console.log(data);
      var dd = Data.createData(data);
      console.log(dd);
      console.log(data);
      dd.then(function(data) {
        //Data.createData(data).then(function(data) {
        console.log(data);
      }, function(response) {
        console.log(data);
        alert(response);
      });
    }
  })
