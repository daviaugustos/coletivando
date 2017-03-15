app.controller('OfertaCtrl', function($scope, OfertaService, $state) {
	var listaOfertasDados = OfertaService.readAll();
	 var listaOfertasProcessadas = [];

	listaOfertasDados.forEach(function(ofertaSalva){
		var valorDescontoAplicado = ofertaSalva.valorUnitario - (ofertaSalva.valorUnitario * (ofertaSalva.desconto / 100));
		
		var ofertaView = {
			titulo: ofertaSalva.descricao,
			enderecoImagem: ofertaSalva.enderecoImagem,
			valorUnitario: ofertaSalva.valorUnitario,
			valorPromocional: valorDescontoAplicado,
			dataLimite: ofertaSalva.dataLimite
		}
		listaOfertasProcessadas.push(ofertaView);
	});

	$scope.listaOfertas = listaOfertasProcessadas;
});

app.controller('UsuarioCtrl', 
	function($scope, $state) {

	
});

app.controller('CategoriaCtrl', function($scope, CategoriaService, $state){
	$scope.categorias = CategoriaService.readAll();
	
	//aguardando implementação das ofertas na home e id de filtro na url
	$scope.filterHome = function(filterId){
		$state.go('oferta-lista', {filterId: filterId});
	}
	$scope.showPersonalizar = function(){
		$state.go('personalizar-categorias');
	}
});