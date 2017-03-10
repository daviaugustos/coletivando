var app = angular.module('coletivando', ['ionic'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('oferta-lista', {
    url: '/oferta-lista',
    templateUrl: 'templates/ofertas/oferta-lista.html',
    controller: 'OfertaCtrl'
  });

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'templates/usuarios/login.html',
    controller: 'UsuarioCtrl'
  });

  $urlRouterProvider.otherwise('/oferta-lista');
});