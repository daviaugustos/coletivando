app.factory('OfertaService', function() {
	var ofertas = [
		{
			id: 1,
			descricao: 'Iphone 7 128GB',
			enderecoImagem:'img/home/iphone.jpg', //aqui possivelmente um array de img, porém como definir a principal do anuncio?
			qtdUnidadeMin: '1000',
			desconto: '50',
			dataLimite: '01/05/2017',
			valorUnitario: ['3000','4500','4400']
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