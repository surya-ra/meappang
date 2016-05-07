angular.module('starter')
 
.controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    name: '',
    password: ''
  };
 
  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('inside');
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: errMsg
      });
    });
  };
})
.controller('RegisterCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    name: '',
    password: ''
  };
 
  $scope.signup = function() {
    AuthService.register($scope.user).then(function(msg) {
      $state.go('outside.login');
      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: msg
      });
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: errMsg
      });
    });
  };
})
 
.controller('InsideCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state) {
  $scope.destroySession = function() {
    AuthService.logout();
  };
 
  $scope.getInfo = function() {
    $http.get(API_ENDPOINT.url + '/memberinfo').then(function(result) {
      $scope.memberinfo = result.data.msg;
    });
  };
 
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outside.login');
  };
})
 
.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('outside.login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });
})
/*edit 1 @surya*/
/*controller for personal info*/

.controller('InfoCtrl',function($scope, AuthService, API_ENDPOINT, $http, $state) {
  $scope.p_info = {
    first_name : ' ',
    last_name : ' ',
    Birth : ' '
  };
    $scope.personalInfo = function() {
    AuthService.personalInfo($scope.p_info).then(function(msg) {
      $state.go('perinfo');
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: errMsg
      });
    });
  };
})

/*controller for MediCtrl*/

.controller('MediCtrl',function($scope, AuthService, API_ENDPOINT, $http, $state){
  $scope.medicalInfo = function() {
    AuthService.medicalInfo().then(function(msg) {
      $state.go('medical');
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: errMsg
      });
    });
  };
})


/*edit 2 */
/*controller for charts*/
/*creator: @Surya*/

.controller('exampleCtrl', function($scope){
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Sugar'];
  $scope.data = [
    [123, 120, 180, 181, 156, 0, 0]
  ];
});