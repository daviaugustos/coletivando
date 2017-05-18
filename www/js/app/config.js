angular.module('coletivando')
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $firebaseRefProvider, $ionicCloudProvider) {
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
            storageBucket: "gs://coletivando-3e1e2.appspot.com/",
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
                'naoLogado-home-tab': {
                    templateUrl: 'templates/ofertas/oferta-lista.html',
                    controller: 'OfertaListaCtrl'
                }
            }
        });

        $stateProvider.state('visualizar-oferta', {
            url: '/visualizar-oferta/:id',
            templateUrl: 'templates/ofertas/visualizar-oferta.html',
            controller: 'VisualizarOfertaCtrl'
        });

        $stateProvider.state('tabsNaoLogado.explore', {
            url: '/nao-logado-explore',
            views: {
                'naoLogado-explore-tab': {
                    templateUrl: 'templates/categorias/explore.html',
                    controller: 'CategoriaCtrl'
                }
            }
        });

        $stateProvider.state('tabsNaoLogado.personalizarCategorias', {
            url: '/nao-logado-personalizarCategorias',
            views: {
                'naoLogado-explore-tab': {
                    templateUrl: 'templates/categorias/personalizar-categorias.html',
                    controller: 'CategoriaCtrl'
                }
            }
        });

        $stateProvider.state('tabsNaoLogado.login', {
            url: '/nao-logado-login',
            views: {
                'naoLogado-login-tab': {
                    templateUrl: 'templates/usuarios/login.html',
                    controller: 'LoginCtrl'
                }
            }
        });

        $stateProvider.state('tabsNaoLogado.register-choose', {
            url: '/nao-logado-register-choose',
            views: {
                'naoLogado-login-tab': {
                    templateUrl: 'templates/outros/register-choose.html',
                    controller: 'RegisterChooseCtrl'
                }
            }
        });

        $stateProvider.state('tabsNaoLogado.cadastro-user', {
            url: '/cadastro-user',
            views: {
                'naoLogado-login-tab': {
                    templateUrl: 'templates/usuarios/cadastro-user.html',
                    controller: 'UsuarioFisicoCtrl'
                }
            }
        });

        $stateProvider.state('tabsNaoLogado.cadastro-empresa', {
            url: '/cadastro-empresa',
            views: {
                'naoLogado-login-tab': {
                    templateUrl: 'templates/empresa/cadastro-empresa.html',
                    controller: 'UsuarioJuridicoCtrl'
                }
            }
        });

        $stateProvider.state('tabsJuridicoLogado', {
            url: '/tabsJuridicoLogado',
            abstract: true,
            templateUrl: 'templates/tabs/tabsJuridicoLogado.html'
        });

        $stateProvider.state('tabsJuridicoLogado.home', {
            url: '/juridico-logado-home',
            views: {
                'juridicoLogado-home-tab': {
                    templateUrl: 'templates/ofertas/oferta-lista.html',
                    controller: 'OfertaListaCtrl'
                }
            }
        });

        $stateProvider.state('tabsJuridicoLogado.explore', {
            url: '/juridico-logado-explore',
            views: {
                'juridicoLogado-explore-tab': {
                    templateUrl: 'templates/categorias/explore.html',
                    controller: 'CategoriaCtrl'
                }
            }
        });

        $stateProvider.state('tabsJuridicoLogado.conta', {
            url: '/juridicoLogado-minha-conta',
            views: {
                'juridicoLogado-conta-tab': {
                    templateUrl: 'templates/empresa/minha-conta.html',
                    controller: 'UsuarioJuridicoCtrl'
                }
            }

        });

        $stateProvider.state('tabsJuridicoLogado.minhasOfertas', {
            url: '/juridicoLogado-minhas-ofertas',
            views: {
                'juridicoLogado-conta-tab': {
                    templateUrl: 'templates/ofertas/minhas-ofertas.html',
                    controller: 'MinhasOfertasCtrl'
                }
            }
        });

        $stateProvider.state('tabsJuridicoLogado.criarOferta', {
            url: '/juridicoLogado-criar-oferta',
            views: {
                'juridicoLogado-conta-tab': {
                    templateUrl: 'templates/ofertas/criar-oferta.html',
                    controller: 'OfertaCtrl'
                }
            }
        });

        $stateProvider.state('tabsJuridicoLogado.editarEmpresa', {
            url: '/juridicoLogado-editar-empresa/:id',
            views: {
                'juridicoLogado-conta-tab': {
                    templateUrl: 'templates/empresa/editar-empresa.html',
                    controller: 'UsuarioJuridicoUpdateCtrl'
                }
            }
        });

        $stateProvider.state('tabsFisicoLogado', {
            url: '/tabsFisicoLogado',
            abstract: true,
            templateUrl: 'templates/tabs/tabsFisicoLogado.html'
        });

        $stateProvider.state('tabsFisicoLogado.home', {
            url: '/fisico-logado-home',
            views: {
                'fisicoLogado-home-tab': {
                    templateUrl: 'templates/ofertas/oferta-lista.html',
                    controller: 'OfertaListaCtrl'
                }
            }
        });

        $stateProvider.state('tabsFisicoLogado.explore', {
            url: '/fisico-logado-explore',
            views: {
                'fisicoLogado-explore-tab': {
                    templateUrl: 'templates/categorias/explore.html',
                    controller: 'CategoriaCtrl'
                }
            }
        });

        $stateProvider.state('categoriaOfertas', {
            url: '/categoria-ofertas/:id',
            templateUrl: 'templates/ofertas/categoria-ofertas.html',
            controller: 'CategoriaOfertasCtrl'

        });

        $stateProvider.state('tabsFisicoLogado.conta', {
            url: '/fisico-logado-conta',
            views: {
                'fisicoLogado-conta-tab': {
                    templateUrl: 'templates/usuarios/minha-conta.html',
                    controller: 'UsuarioFisicoCtrl'
                }
            }
        });

        $stateProvider.state('tabsFisicoLogado.notificacoes', {
            url: '/fisico-logado-notificacoes',
            views: {
                'fisicoLogado-notificacoes-tab': {
                    templateUrl: 'templates/outros/notifications.html',
                    controller: 'NotificationCtrl'
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

        $stateProvider.state('alterar-senha-fisica', {
            url: '/alterar-senha-fisica',
            controller: 'UsuarioFisicoCtrl'
        });

        $stateProvider.state('alterar-senha-juridica', {
            url: '/alterar-senha-juridica',
            controller: 'UsuarioJuridicoCtrl'
        });

        $stateProvider.state('minha-conta-fisica', {
            url: '/minha-conta-fisica',
            templateUrl: 'templates/usuarios/minha-conta.html',
            controller: 'UsuarioFisicoCtrl'
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

        $stateProvider.state('descricao', {
            url: '/visualizar-oferta/descricao/:id',
            templateUrl: 'templates/ofertas/descricao.html',
            controller: 'VisualizarOfertaCtrl'
        });

        $urlRouterProvider.otherwise('/tabsNaoLogado/nao-logado-home');
    });

