angular.module('app', ['ngRoute']);

angular.module('app').controller('HomeController', function ($scope) {

});

angular.module('app').factory('authService', function ($http, $q, $location) {

  let auth;

  function getAuth() {
    return auth;
  };

  function login(usuario) {

    let deferred = $q.defer();

    $http.post('http://localhost:3000/api/auth', usuario)
      .then(function (res) {
        auth = res.data;
        $location.path('/private');
        deferred.resolve(auth);
      }, function (error) {
        deferred.resolve('NOK');
      });

    return deferred.promise;
  };

  function isLogged() {
    let deferred = $q.defer();

    if (!!auth) {
      deferred.resolve();
    } else {
      $location.path('/login');
      deferred.reject();
    }
    return deferred.promise;
  };

  return {
    login: login,
    isLogged: isLogged,
    getAuth: getAuth
  };
});

angular.module('app').controller('LoginController', function ($scope, authService) {

  $scope.login = function (usuario) {
    authService.login(usuario);
  };
});

angular.module('app').controller('PrivateController', function ($scope, authService) {
  $scope.auth = authService.getAuth();
});

angular.module('app').config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      controller: 'HomeController',
      templateUrl: 'home.html'
    })
    .when('/login', {
      controller: 'LoginController',
      templateUrl: 'login.html'
    })
    .when('/private', {
      controller: 'PrivateController',
      templateUrl: 'private.html',
      resolve: {
        checkAuth: function (authService) {
          return authService.isLogged();
        }
      }
    })
    .otherwise('/home');
});