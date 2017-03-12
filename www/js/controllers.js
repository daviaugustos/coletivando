app.controller('OfertaCtrl', 
	function($scope, OfertaService, $state) {

	$scope.ofertas = OfertaService.readAll();
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
});