app.controller('OfertaCtrl', function($scope, OfertaService, $state) {
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
});

app.controller('UsuarioCtrl', function($scope, $state) {
	
});

app.controller('CategoriaCtrl', function($scope, CategoriaService, $state){
	$scope.categorias = CategoriaService.readAll();
	
	//aguardando implementação das ofertas na home e id de filtro na url
	$scope.filterHome = function(filterId){
		$state.go('oferta-lista', {filterId: filterId});
	};

	$scope.showPersonalizar = function(){
		$state.go('personalizar-categorias');
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
	function($scope, PesquisaService, $state) {

	$scope.pesquisas = PesquisaService.readAll();

	$scope.showIndex = function(){
		$state.go('oferta-lista');
	};
	
});

app.controller('OfertasApoiadasCtrl', 
	function($scope, OfertasApoiadasService, OfertasRealizadasService, OfertasIncompletasService, $state) {

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
	
});

app.controller('NotificationCtrl', 
	function($scope, NotificationService, $state) {

	$scope.notification = NotificationService.readAll();

	$scope.showIndex = function(){
		$state.go('oferta-lista');
	};
	
});

app.controller('RegisterChoose', function($scope, $state) {
	
});