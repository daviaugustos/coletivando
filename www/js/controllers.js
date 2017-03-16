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
	
	$scope.showLogin = function(){
		$state.go('login');
	};
	$scope.showCadastro = function(){
		$state.go('cadastro-user');
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
		var endereco = c.img;
	
		if (endereco.search('colored') != -1){
			c.img = endereco.replace("colored", "outlined");
		}
		else{
			c.img = endereco.replace("outlined", "colored");
		}

		categorias[indexCategoria].img = c.img;
	}
});

app.controller('SearchCtrl', 
	function($scope, PesquisaService, $state) {

	$scope.pesquisas = PesquisaService.readAll();
	
});