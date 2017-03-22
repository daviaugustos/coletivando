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
        controller: 'OfertaCtrl'
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

 /* $stateProvider.state('personalizar-categorias',{
    url: '/personalizar-categorias',
    templateUrl: 'templates/categorias/personalizar-categorias.html',
    controller: 'CategoriaCtrl'
  });*/

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
        controller: 'UsuarioCtrl'
      }
    }
  });

  $stateProvider.state('tabNavegacao.login.register-choose', {
    url: '/register-choose',
    views: {
      'login-tab@tabNavegacao' : {
        templateUrl: 'templates/outros/register-choose.html',
        controller: 'RegisterChoose'
      }
    }
  });

  $stateProvider.state('criar-oferta', {
    url: '/criar-oferta',
    templateUrl: 'templates/ofertas/criar-oferta.html',
    controller: 'OfertaCtrl'
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

  $stateProvider.state('editar-empresa', {
    url: '/editar-empresa',
    templateUrl: 'templates/empresa/editar-empresa.html',
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

  $stateProvider.state('ofertas-apoiadas-realizadas', {
    url: '/ofertas-apoiadas-realizadas',
    templateUrl: 'templates/ofertas/ofertas-apoiadas-realizadas.html',
    controller: 'OfertasApoiadasCtrl'
  });

  $stateProvider.state('ofertas-apoiadas-incompletas', {
    url: '/ofertas-apoiadas-incompletas',
    templateUrl: 'templates/ofertas/ofertas-apoiadas-incompletas.html',
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

