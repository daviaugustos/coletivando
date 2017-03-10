app.factory('OfertaService', function() {
	var ofertas = [
		{
			id: 1,
			nome: 'iphone 4',
			valor: 'R$1.800,00'
		},
		{
			id: 2,
			nome: 'Galaxy S6',
			valor: 'R$2.000,00'
		}
	]

	return {
		readAll: function() {
			return ofertas;
		}
	}
});