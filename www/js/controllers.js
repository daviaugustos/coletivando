app.controller('OfertaCtrl', function($scope, OfertaService, $state, $ionicHistory) {
	var listaOfertasDados = OfertaService.readAll();
	var listaOfertasProcessadas = [];

	listaOfertasDados.forEach(function(ofertaSalva){
		var valorDescontoAplicado = ofertaSalva.valorUnitario - (ofertaSalva.valorUnitario * (ofertaSalva.desconto / 100));
		
		var ofertaView = {
			id: ofertaSalva.id,
			titulo: ofertaSalva.descricao,
			enderecoImagem: ofertaSalva.enderecoImagem,
			valorUnitario: ofertaSalva.valorUnitario,
			valorPromocional: valorDescontoAplicado,
			dataLimite: ofertaSalva.dataLimite,
			desconto: ofertaSalva.desconto
		}
		listaOfertasProcessadas.push(ofertaView);
	});

	$scope.listaOfertas = listaOfertasProcessadas;
	
	$scope.showPesquisa = function(){
		$state.go('pesquisar');
	};

	$scope.goBackHandler = function(){
		$ionicHistory.goBack(-1);
	}
});

app.controller('CategoriaCtrl', function($scope, CategoriaService, $state, $ionicHistory){
	$scope.categorias = CategoriaService.readAll();
	
	//aguardando implementação das ofertas na home e id de filtro na url
	$scope.filterHome = function(filterId){
		$state.go('oferta-lista', {filterId: filterId});
	};

	$scope.goBackHandler = function(){
		$ionicHistory.goBack(-1);
	}

	$scope.showPersonalizar = function(){
		$state.go('tabNavegacao.explore.personalizar-categorias');
	};

	$scope.trocaImagem = function(i){
		var c = $scope.categorias[i];
		var endereco = angular.copy(c.img);
	
		if (endereco.search('colored') != -1){
			c.img = endereco.replace("colored", "outlined");
		}
		else{
			c.img = endereco.replace("outlined", "colored");
		}

		$scope.categorias[i].img = c.img;
	}
});

app.controller('SearchCtrl', 
	function($scope, PesquisaService, $state, $ionicHistory) {

	$scope.pesquisas = PesquisaService.readAll();

	$scope.goBackHandler = function(){
		$ionicHistory.goBack(-1);
	};
	
});

app.controller('OfertasApoiadasCtrl', 
	function($scope, OfertasApoiadasService, OfertasRealizadasService, OfertasIncompletasService, $state, $ionicHistory) {

	$scope.apoiadas = OfertasApoiadasService.readAll();
	$scope.realizadas = OfertasRealizadasService.readAll();
	$scope.incompletas = OfertasIncompletasService.readAll();

	$scope.showIndex = function(){
		$state.go('oferta-lista');
	};

	$scope.showAndamento = function(){
		$state.go('ofertas-apoiadas');
	};

	$scope.showRealizadas = function(){
		$state.go('ofertas-apoiadas-realizadas');
	};

	$scope.showIncompletas = function(){
		$state.go('ofertas-apoiadas-incompletas');
	};
	$scope.goBackHandler = function(){
		$ionicHistory.goBack(-1);
	}
});

app.controller('NotificationCtrl', 
	function($scope, NotificationService, $state) {

	$scope.notification = NotificationService.readAll();

	$scope.showIndex = function(){
		$state.go('oferta-lista');
	};
	
});

app.controller('RegisterChooseCtrl', function($scope, $state, $ionicHistory) {
	$scope.goBackHandler = function(){
		$ionicHistory.goBack(-1);
	}
});

app.controller("LoginCtrl", function($scope, $state){
	$scope.showCadastros = function(){
		$state.go("tabNavegacao.login.register-choose");
	};
});

app.controller('UsuarioJuridicoCtrl', function($scope, $http, $ionicHistory, EmpresaCadastroService){
	$scope.goBackHandler = function(){
		$ionicHistory.goBack(-1);
	}

	$scope.buscaDadosEmpresa = function(cnpj){
		var jsonpConfig = '?callback=JSON_CALLBACK';
		var wsUrl = "https://www.receitaws.com.br/v1/cnpj/"
		var jsonpUrl = wsUrl + cnpj + jsonpConfig;
		$http.jsonp(jsonpUrl)
		.then(
			function (resposta){
				return resposta.data;
			},
			function (error){
				return error; //verificar se o erro é retornado direto no objeto de retorno
			}
		)
	}
	var pessoaJuridica = {
		name: "EOQ25",
		shortname: "Nome Fantasia",
		cnpj: "99999999999999",
		cnae: "Varejista",
		phone: "(99) 9999-9999",
		cel: "(99) 9999-9999",
		email: "email@email.com",
		status: 0,
		image: "img/logo.png",
		cep: "99999-999",
		address: "rua quinze de novembro",
		number: "999",
		area: "bairro abril",
		complement: "próximo da av. azul",
		city: "rio preto",
		state: "são paulo",
		password: "algEJIG315LGojgalG",
		created: "04-04-2017 08:47",
		modified: "04-04-2017 13:47"
	}
    $scope.salvar = function(){
        EmpresaCadastroService.create(pessoaJuridica);
        $ionicHistory.goBack(-1);
    }
});

app.controller('UsuarioFisicoCtrl', function($scope, $ionicHistory){
	$scope.goBackHandler = function(){
		$ionicHistory.goBack(-1);
	}
});