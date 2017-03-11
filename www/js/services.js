app.factory('OfertaService', function() {
	var ofertas = [
		{
			id: 1,
			descricao: 'iphone 4',
			imagem:'', //aqui possivelmente um array de img, porém como definir a principal do anuncio?
			valorArrecadado: '',
			desconto: '',
			dataLimite: '',
			valor: '1800'
		}
	]

	return {
		readAll: function() {
			return ofertas;
		}
	}
});