app.factory('OfertaService', function() {
	var ofertas = [
		{
			id: 1,
			descricao: 'Smartphone Apple iPhone 7 128GB',
			enderecoImagem:'img/home/iphone.jpg', //aqui possivelmente um array de img, porém como definir a principal do anuncio?
			qtdUnidadeMin: 1000,
			desconto: 50,
			dataLimite: '01/05/2017',
			valorUnitario: 3079.12
		},
		{
			id: 2,
			descricao: 'Tablet Apple iPad mini Tela Retina Wi-Fi 16 GB',
			enderecoImagem:'img/home/ipad.jpg', 
			qtdUnidadeMin: 1000,
			desconto: 30,
			dataLimite: '28/05/2017',
			valorUnitario: 1799
		},
		{
			id: 3,
			descricao: 'Horizon Zero Dawn Playstation 4 Blu-Ray',
			enderecoImagem:'img/home/game.jpg', 
			qtdUnidadeMin: 5000,
			desconto: 23,
			dataLimite: '05/06/2017',
			valorUnitario: 199.90
		},
		{
			id: 1,
			descricao: '212 Men Eau de Toilette 50ml',
			enderecoImagem:'img/home/perfume.jpg', 
			qtdUnidadeMin: 50,
			desconto: 41,
			dataLimite: '08/05/2017',
			valorUnitario: 219.85
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
			img: 'img/categorias/outlined/Moderncam.svg'
		},
		{
			id: 2,
			nome: 'Computadores',
			img: 'img/categorias/outlined/Classicswatch.svg'
		},
		{
			id: 3,
			nome: 'Games',
			img: 'img/categorias/outlined/Classicswatch.png'
		},
		{
			id: 4,
			nome: 'Eletrônicos',
			img: 'img/categorias/outlined/Ring.svg'
		},
		{
			id: 4,
			nome: 'Eletrônicos',
			img: 'img/categorias/outlined/Ring.svg'
		},
		{
			id: 4,
			nome: 'Eletrônicos',
			img: 'img/categorias/outlined/Ring.svg'
		},
		{
			id: 4,
			nome: 'Eletrônicos',
			img: 'img/categorias/outlined/Ring.svg'
		},
		{
			id: 4,
			nome: 'Eletrônicos',
			img: 'img/categorias/outlined/Ring.svg'
		}

	]
	return{
		readAll: function(){
			return categorias;
		}
	}

	
});

app.factory('PesquisaService', function(){

    var pesquisas = [
        {
            id: 1,
            name: 'Iphone 5s',
            cost: 'R$ 3000,00',
			company: 'por Americanas',
			image:'img/pesquisar/iphone5s.jpg'
        },
        {
            id: 2,
            name: 'Playstation 4',
            cost: 'R$ 2000,00',
			company: 'por Submarino',
			image: 'img/pesquisar/ps4.png'
        },
        {
            id: 3,
            name: 'Radeon RX 460 WINDFORCE',
            cost: 'R$ 500,00',
			company: 'por Kabum!',
			image: 'img/pesquisar/rx.jpg'
        }
        
    ]

    return {

        readAll: function() {
            return pesquisas
        }
	}

});

app.factory('NotificationService', function(){

    var notification = [
        {
            id: 1,
            text: 'A oferta de Iphone 7 foi concluída',
            time: '17:00',
			image:'img/notifications/bag.png'
        },
        {
            id: 2,
            text: 'Restam dois dias para o prazo da oferta de Iphone 7 acabar',
            time: '2 d',
			image: 'img/notifications/ampulheta.png'
        },
        {
            id: 3,
            text: 'O prazo da oferta de Xbox One acabou',
            time: '4 d',
			image: 'img/notifications/relogio.png'
        }
        
    ]

    return {

        readAll: function() {
            return notification
        }
	}

});

// ofertas-apoiadas

app.factory('OfertasApoiadasService', function(){

    var apoiadas = [
        {
            id: 1,
            name: 'Iphone 5s',
            cost: 'R$ 3000,00',
			company: 'por Americanas',
			image:'img/pesquisar/iphone5s.jpg'
        },
        {
            id: 2,
            name: 'Playstation 4',
            cost: 'R$ 2000,00',
			company: 'por Submarino',
			image: 'img/pesquisar/ps4.png'
        },
        {
            id: 3,
            name: 'Radeon RX 460 WINDFORCE',
            cost: 'R$ 500,00',
			company: 'por Kabum!',
			image: 'img/pesquisar/rx.jpg'
        }
        
    ]

    return {

        readAll: function() {
            return apoiadas
        }
	}

});

app.factory('OfertasRealizadasService', function(){

    var realizadas = [
        {
            id: 3,
            name: 'Radeon RX 460 WINDFORCE',
            cost: 'R$ 500,00',
			company: 'por Kabum!',
			image: 'img/pesquisar/rx.jpg'
        }
        
    ]

    return {

        readAll: function() {
            return realizadas
        }
	}

});

app.factory('OfertasIncompletasService', function(){

    var incompletas = [
        {
            id: 2,
            name: 'Playstation 4',
            cost: 'R$ 2000,00',
			company: 'por Submarino',
			image: 'img/pesquisar/ps4.png'
        }
    ]

    return {

        readAll: function() {
            return incompletas
        }
	}

});

// fim serviços das ofertas apoiadas
