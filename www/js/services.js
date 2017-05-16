app.factory('OfertaService', function() {
	var ofertas = [
		{
			id: 1,
			descricao: 'iPhone 7',
			enderecoImagem:'img/home/iphone2.jpg', //aqui possivelmente um array de img, porém como definir a principal do anuncio?
			qtdUnidadeMin: 1000,
			desconto: 50,
			dataLimite: '01/05/2017',
			valorUnitario: 3079.12
		},
		{
			id: 2,
			descricao: 'iPad Mini',
			enderecoImagem:'img/home/ipad2.jpg', 
			qtdUnidadeMin: 1000,
			desconto: 30,
			dataLimite: '28/05/2017',
			valorUnitario: 1799
		},
		{
			id: 3,
			descricao: 'Horizon Zero Dawn',
			enderecoImagem:'img/home/game2.jpg', 
			qtdUnidadeMin: 5000,
			desconto: 23,
			dataLimite: '05/06/2017',
			valorUnitario: 199.90
		},
		{
			id: 1,
			descricao: '212 Men Eau',
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
			id: "CELULARES",
			nome: 'Celulares',
			img: 'img/categorias/outlined/Moderncam.svg'
		},
		{
			id: "INFORMATICA",
			nome: 'Informática',
			img: 'img/categorias/outlined/Classicswatch.svg'
		},
		{
			id: "GAMES",
			nome: 'Games',
			img: 'img/categorias/outlined/Classicswatch.svg'
		},
		{
			id: "ELETRONICOS",
			nome: 'Eletrônicos',
			img: 'img/categorias/outlined/Ring.svg'
		},
		{
			id: "TV",
			nome: 'TV',
			img: 'img/categorias/outlined/Ring.svg'
		},
		{
			id: "ELETRODOMESTICOS",
			nome: 'Eletrodomésticos',
			img: 'img/categorias/outlined/Ring.svg'
		},
		{
			id: "ESPORTE_LAZER",
			nome: 'Esporte e Lazer',
			img: 'img/categorias/outlined/Ring.svg'
		},
		{
			id: "LIVROS",
			nome: 'Livros',
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

app.factory('EmpresaPerfilService', function(){

    var empresa = [
        {
            id: 2,
            name: 'KaBuM!',
            offer: '55 ofertas',
			image: 'img/perfil-empresa/kabum.png'
        }
    ]

    return {

        readAll: function() {
            return incompletas
        }
	}

});

//service para ser deletado ---------------------------------------------------
app.factory('EmpresaCadastroService', function($firebaseArray, $ionicAuth, $q){

	//Pega ref até o nó de "keys"
	var ref = firebase.database().ref().child('pessoaJuridica');
	var empresas = $firebaseArray(ref);
	console.log(empresas);
	return {
		create: function(objPessoaJuridica){
			var objUsuarioIonicCloud = {
				email: objPessoaJuridica.email,
				password: objPessoaJuridica.senha
			}
			$ionicAuth.signup(objUsuarioIonicCloud)
			.then(function(){
				empresas.$add(objPessoaJuridica);
			});
		},

		readAll: function(){
			empresas.$loaded().then(function(){
				return empresas;
			});
		},

		read: function(id){
			var defer = $q.defer();
			empresas.$loaded().then(function(){
				console.log('id que chegou: '+id);
				console.log('posição na array: '+empresas.$indexFor(id));
				console.log('objeto lido: '+empresas[empresas.$indexFor(id)]);
				var resp = empresas[empresas.$indexFor(id)];
				
				defer.resolve(resp);
			});

			return defer.promise;
		},

		update: function(objPessoaJuridica){
			empresas[empresas.$indexFor(objPessoaJuridica.$id)] = objPessoaJuridica;
			empresas.$save(empresas.$indexFor(objPessoaJuridica.$id));
		},

		delete: function(id){
			empresas.$loaded().then(function(){
				empresas.$remove(empresas.$indexFor(id));
			});
		}
	}
});
//service para ser deletado ---------------------------------------------------