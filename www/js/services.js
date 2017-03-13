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

app.factory('CategoriaService', function() {
	var categorias = [
		{
			id: 1,
			nome: 'Smartphones',
			img: 'Moderncam.png'
		},
		{
			id: 2,
			nome: 'Computadores',
			img: 'Classicswatch.png'
		},
		{
			id: 3,
			nome: 'Games',
			img: 'ioSlove.png'
		},
		{
			id: 4,
			nome: 'Eletrônicos',
			img: 'Ring.png'
		}
	]
	return{
		readAll: function(){
			return categorias;
		}
	}
});