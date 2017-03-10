app.controller('OfertaListaCtrl', 
	function($scope, OfertaService, $state) {

	$scope.ofertas = OfertaService.readAll();
});