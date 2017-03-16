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
  

  $stateProvider.state('explore', {
    url: '/explore',
    templateUrl: 'templates/usuarios/explore.html',
    controller: 'CategoriaCtrl'
  });

  $stateProvider.state('personalizar-categorias',{
    url: '/personalizar-categorias',
    templateUrl: 'templates/usuarios/personalizar-categorias.html',
    controller: 'CategoriaCtrl'
  });

  $stateProvider.state('alterar-senha', {
    url: '/alterar-senha',
    templateUrl: 'templates/usuarios/alterar-senha.html',
    controller: 'UsuarioCtrl'
  });

  $stateProvider.state('cadastro-empresa', {
    url: '/cadastro-empresa',
    templateUrl: 'templates/empresa/cadastro-empresa.html',
    controller: 'UsuarioCtrl'
  });

  $stateProvider.state('cadastro-user', {
    url: '/cadastro-user',
    templateUrl: 'templates/usuarios/cadastro-user.html',
    controller: 'UsuarioCtrl'
  });

  $stateProvider.state('minha-conta', {
    url: '/minha-conta',
    templateUrl: 'templates/usuarios/minha-conta.html',
    controller: 'UsuarioCtrl'
  });

  $urlRouterProvider.otherwise('/oferta-lista');
});

