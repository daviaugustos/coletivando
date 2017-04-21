angular.module('coletivando')
    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $firebaseRefProvider, $ionicCloudProvider) {
        // Ionic Cloud
        $ionicCloudProvider.init({
            "core": {
            "app_id": "921ad049"
            }
        });
        
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

        $stateProvider.state('tabsNaoLogado', {
            url: '/tabsNaoLogado',
            abstract: true,
            templateUrl: 'templates/tabs/tabsNaoLogado.html'
        });
        
        $stateProvider.state('tabsNaoLogado.home', {
            url: '/nao-logado-home',
            views: {
                'naoLogado-home-tab' : {
                    templateUrl: 'templates/ofertas/oferta-lista.html',
                    controller: 'OfertaListaCtrl'
                }
            }
        });

        $stateProvider.state('tabsNaoLogado.explore', {
            url: '/nao-logado-explore',
            views: {
                'naoLogado-explore-tab' : {
                    templateUrl: 'templates/categorias/explore.html',
                    controller: 'CategoriaCtrl'
                }
            }
        });

        $stateProvider.state('tabsNaoLogado.explore.personalizarCategorias',{
            url: '/nao-logado-personalizarCategorias',
            views: {
                'naologado-explore-tab' : {
                    templateUrl: 'templates/categorias/personalizar-categorias.html',
                    controller: 'CategoriaCtrl'
                }
            }
        });

        $stateProvider.state('tabsNaoLogado.login', {
            url: '/nao-logado-login',
            views: {
            'naoLogado-login-tab' :{
                templateUrl: 'templates/usuarios/login.html',
                controller: 'LoginCtrl'
            }
            }
        });

        $stateProvider.state('tabsNaoLogado.login.register-choose', {
            url: '/nao-logado-register-choose',
            views: {
                'naoLogado-login-tab' : {
                    templateUrl: 'templates/outros/register-choose.html',
                    controller: 'RegisterChooseCtrl'
                }
            }
        });

        $stateProvider.state('cadastro-user', {
            url: '/cadastro-user',
            views:{
            'login-tab': {
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
            'login-tab': {
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

        $urlRouterProvider.otherwise('/tabsNaoLogado/nao-logado-home');
    });
