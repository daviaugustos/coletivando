app.controller('OfertaCtrl', 
	function($scope, OfertaService, $state) {

	$scope.ofertas = OfertaService.readAll();
});

app.controller('UsuarioCtrl', 
	function($scope, $state) {

	
});

app.controller('CategoriaCtrl', function($scope, CategoriaService, $state){
	$scope.categorias = CategoriaService.readAll();
});