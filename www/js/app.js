var app = angular.module('coletivando', ['ionic', 'firebase', 'ionic.cloud'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $firebaseRefProvider, $ionicCloudProvider) {

  // Firebase
  var config = {
    apiKey: "AIzaSyAASmm1a3uZxkOpsDdQAkQ2o-NmEi4Z3s8",
    authDomain: "coletivando-3e1e2.firebaseapp.com",
    databaseURL: "https://coletivando-3e1e2.firebaseio.com",
    projectId: "coletivando-3e1e2",
    storageBucket: "coletivando-3e1e2.appspot.com",
    messagingSenderId: "181251271144"
  };
  firebase.initializeApp(config);

  // States
  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider.state('tabNavegacao', {
    url: '/tabNavegacao',
    abstract: true,
    templateUrl: 'templates/outros/tabNavegacao.html'
  });
  
  $stateProvider.state('tabNavegacao.home', {
    url: '/home',
    views: {
      'home-tab' : {
        templateUrl: 'templates/ofertas/oferta-lista.html',
        controller: 'OfertaListaCtrl'
      }
    }
  });

  $stateProvider.state('tabNavegacao.explore', {
    url: '/explore',
    views: {
      'explore-tab' : {
        templateUrl: 'templates/categorias/explore.html',
        controller: 'CategoriaCtrl'
      }
    }
  });

  $stateProvider.state('tabNavegacao.explore.personalizar-categorias',{
    url: '/personalizar-categorias',
    views: {
      'explore-tab@tabNavegacao' : {
        templateUrl: 'templates/categorias/personalizar-categorias.html',
        controller: 'CategoriaCtrl'
      }
    }
  });

  $stateProvider.state('tabNavegacao.login', {
    url: '/login',
    views: {
      'login-tab' :{
        templateUrl: 'templates/usuarios/login.html',
        controller: 'LoginCtrl'
      }
    }
  });

  $stateProvider.state('tabNavegacao.login.register-choose', {
    url: '/register-choose',
    views: {
      'login-tab@tabNavegacao' : {
        templateUrl: 'templates/outros/register-choose.html',
        controller: 'RegisterChooseCtrl'
      }
    }
  });

  $stateProvider.state('cadastro-user', {
    url: '/cadastro-user',
    views:{
      'login-tab@tabNavegacao': {
        templateUrl: 'templates/usuarios/cadastro-user.html',
        controller: 'UsuarioFisicoCtrl'
      }
    }
  });

  $stateProvider.state('editar-user', {
    url: '/editar-user/:id',
    templateUrl: 'templates/usuarios/editar-user.html',
    controller: 'UsuarioFisicoUpdateCtrl'
  });

  $stateProvider.state('editar-user-endereco', {
    url: '/editar-user-endereco/:id',
    templateUrl: 'templates/usuarios/editar-user-endereco.html',
    controller: 'UsuarioFisicoUpdateEnderecoCtrl'
  });
  
  $stateProvider.state('cadastro-empresa', {
    url: '/cadastro-empresa',
    views:{
      'login-tab@tabNavegacao': {
        templateUrl: 'templates/empresa/cadastro-empresa.html',
        controller: 'UsuarioJuridicoCtrl'
      }
    }
  });

  $stateProvider.state('criar-oferta', {
    url: '/criar-oferta',
    templateUrl: 'templates/ofertas/criar-oferta.html',
    controller: 'OfertaCtrl'
  });

  $stateProvider.state('alterar-senha-fisica', {
    url: '/alterar-senha-fisica',
    controller: 'UsuarioFisicoCtrl'
  });

  $stateProvider.state('alterar-senha-juridica', {
    url: '/alterar-senha-juridica',
    controller: 'UsuarioJuridicoCtrl'
  });

  $stateProvider.state('editar-empresa', {
    url: '/editar-empresa/:id',
    templateUrl: 'templates/empresa/editar-empresa.html',
    controller: 'UsuarioJuridicoUpdateCtrl'
  });

  $stateProvider.state('minha-conta-fisica', {
    url: '/minha-conta-fisica',
    templateUrl: 'templates/usuarios/minha-conta.html',
    controller: 'UsuarioFisicoCtrl'
  });

  $stateProvider.state('minha-conta-juridica', {
    url: '/minha-conta-juridica',
    templateUrl: 'templates/usuarios/minha-conta.html',
    controller: 'UsuarioJuridicoCtrl'
  });

  $stateProvider.state('pesquisar', {
    url: '/pesquisar',
    templateUrl: 'templates/outros/pesquisar.html',
    controller: 'SearchCtrl'
  });

  $stateProvider.state('aderir-oferta', {
    url: '/aderir-oferta',
    templateUrl: 'templates/ofertas/aderir-oferta.html',
    controller: 'OfertaCtrl'
  });

  $stateProvider.state('notifications', {
    url: '/notifications',
    templateUrl: 'templates/outros/notifications.html',
    controller: 'NotificationCtrl'
  });

  $stateProvider.state('ofertas-apoiadas', {
    url: '/ofertas-apoiadas',
    templateUrl: 'templates/ofertas/ofertas-apoiadas.html',
    controller: 'OfertasApoiadasCtrl'
  });

  $stateProvider.state('perfil-empresa', {
    url: '/perfil-empresa',
    templateUrl: 'templates/empresa/perfil-empresa.html',
    controller: 'UsuarioCtrl'
  });

  $stateProvider.state('visualizar-oferta', {
    url: '/visualizar-oferta',
    templateUrl: 'templates/ofertas/visualizar-oferta.html',
    controller: 'OfertaCtrl'
  });

  $urlRouterProvider.otherwise('/tabNavegacao/home');
});

