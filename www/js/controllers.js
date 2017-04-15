app.controller('OfertaCtrl', function($scope, $state, $ionicHistory, $firebaseArray, $ionicPopup) {
	// var listaOfertasDados = OfertaService.readAll();
	// var listaOfertasProcessadas = [];

	// listaOfertasDados.forEach(function(ofertaSalva){
	// 	var valorDescontoAplicado = ofertaSalva.valorUnitario - (ofertaSalva.valorUnitario * (ofertaSalva.desconto / 100));
		
	// 	var ofertaView = {
	// 		id: ofertaSalva.id,
	// 		titulo: ofertaSalva.descricao,
	// 		enderecoImagem: ofertaSalva.enderecoImagem,
	// 		valorUnitario: ofertaSalva.valorUnitario,
	// 		valorPromocional: valorDescontoAplicado,
	// 		dataLimite: ofertaSalva.dataLimite,
	// 		desconto: ofertaSalva.desconto
	// 	}
	// 	listaOfertasProcessadas.push(ofertaView);
	// });

	// $scope.listaOfertas = listaOfertasProcessadas;

	$scope.oferta = {
		pessoaJuridicaId: "-Kh9xTcjGD5aZWfY32yk",
		produto: "",
		dataLimite: "",
		precoInicialUn: "",
		desconto: "",
		qtdPessoas: "",
		descricao: "",
		enderecoImagem: "img/home/iphone2.jpg",
		precoFinalUn: "",
		status: "AGUARDANDO"
	}

	$scope.create = function(oferta){
		var ref = firebase.database().ref('ofertas');
		var ofertas = $firebaseArray(ref);
		
		ofertas.$add(oferta);
	};

	$scope.showPesquisa = function(){
		$state.go('pesquisar');
	};

	$scope.goBackHandler = function(){
		$ionicHistory.goBack(-1);
	};

});


app.controller('OfertaUpdateCtrl', function($firebaseObject, $scope, $http, $ionicHistory, $ionicPopup, $stateParams){
	var id = $stateParams.id;
    var ref = firebase.database().ref('ofertas/'+id);
    $scope.oferta = $firebaseObject(ref);

    $scope.update = function(oferta){
		ref = oferta;
		ref.$save();
	}

	$scope.goBackHandler = function(){
		$ionicHistory.goBack(-1);
	}
});

app.controller('OfertaListaCtrl', function($firebaseArray, $scope, $http, $ionicHistory, $ionicPopup){
    var ref = firebase.database().ref('ofertas');
    $scope.ofertas = $firebaseArray(ref);

	$scope.goBackHandler = function(){
		$ionicHistory.goBack(-1);
	}
});


app.controller('CategoriaCtrl', function($scope, CategoriaService, $state, $ionicHistory){
	$scope.categorias = CategoriaService.readAll();
	
	//aguardando implementação das ofertas na home e id de filtro na url
	$scope.filterHome = function(filterId){
		$state.go('oferta-lista', {filterId: filterId});
	};

	$scope.goBackHandler = function(){
		$ionicHistory.goBack(-1);
	}

	$scope.showPersonalizar = function(){
		$state.go('tabNavegacao.explore.personalizar-categorias');
	};

	$scope.trocaImagem = function(i){
		var c = $scope.categorias[i];
		var endereco = angular.copy(c.img);
	
		if (endereco.search('colored') != -1){
			c.img = endereco.replace("colored", "outlined");
		}
		else{
			c.img = endereco.replace("outlined", "colored");
		}

		$scope.categorias[i].img = c.img;
	}
});

app.controller('SearchCtrl', 
	function($scope, PesquisaService, $state, $ionicHistory) {

	$scope.pesquisas = PesquisaService.readAll();

	$scope.goBackHandler = function(){
		$ionicHistory.goBack(-1);
	};
	
});

app.controller('OfertasApoiadasCtrl', 
	function($scope, OfertasApoiadasService, OfertasRealizadasService, OfertasIncompletasService, $state, $ionicHistory) {

	$scope.apoiadas = OfertasApoiadasService.readAll();
	$scope.realizadas = OfertasRealizadasService.readAll();
	$scope.incompletas = OfertasIncompletasService.readAll();

	$scope.showIndex = function(){
		$state.go('oferta-lista');
	};

	$scope.showAndamento = function(){
		$state.go('ofertas-apoiadas');
	};

	$scope.showRealizadas = function(){
		$state.go('ofertas-apoiadas-realizadas');
	};

	$scope.showIncompletas = function(){
		$state.go('ofertas-apoiadas-incompletas');
	};
	$scope.goBackHandler = function(){
		$ionicHistory.goBack(-1);
	}
});

app.controller('NotificationCtrl', 
	function($scope, NotificationService, $state) {

	$scope.notification = NotificationService.readAll();

	$scope.showIndex = function(){
		$state.go('oferta-lista');
	};
	
});

app.controller('RegisterChooseCtrl', function($scope, $state, $ionicHistory) {
	$scope.goBackHandler = function(){
		$ionicHistory.goBack(-1);
	}

	$scope.showUpdate = function(id){
		$state.go('editar-empresa', {id: id})
	}
});

app.controller("LoginCtrl", function($scope, $state){
	$scope.showCadastros = function(){
		$state.go("tabNavegacao.login.register-choose");
	};
});

app.controller('UsuarioJuridicoCtrl', function($ionicAuth, $firebaseArray, $scope, $http, $ionicHistory, $ionicPopup){
	
	/* Mask */
	$('.date').mask('00/00/0000');
	$('.time').mask('00:00:00');
	$('.date_time').mask('00/00/0000 00:00:00');
	$('.cep').mask('00000-000');
	$('.cpf').mask('000.000.000-00');
	$('.cnpj').mask('00.000.000/0000-00');
	$('.money').mask('000.000.000.000.000,00', {reverse: true});

	var SPMaskBehavior = function (val) {
		return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
	},
	spOptions = {
		onKeyPress: function(val, e, field, options) {
			field.mask(SPMaskBehavior.apply({}, arguments), options);
		}
	};

	if($('.phone').length > 0){
		$('.phone').mask(SPMaskBehavior, spOptions);
	}

	/* validate */
	$('form').submit(function() {
		var valid = $(this).validationEngine("validate");
		if(valid) {
			$(this).submit();
		} else {
			return false;
		}
	});

	$('form').validationEngine({
		binded: true,
		updatePromptsPosition: true,
		promptPosition: 'inline',
		scroll: false
	});

	$('input').blur(function(){

		var field_id = $(this).attr('id');

		var isValid = !$(this).validationEngine('validate');

		if(!isValid){
			$(this).addClass('validation_error');
		}else{
			$(this).removeClass('validation_error');
		}

	});
	/* /validate */


	$scope.goBackHandler = function(){
		$ionicHistory.goBack(-1);
	}

	var cnpj;

	$scope.validarCnpj = function(){	
		cnpj = apenasNumeros($('#txtCnpj').val());

		if (cnpj > 0) {
			$.ajax({
				dataType: 'jsonp',
				url: 'https://www.receitaws.com.br/v1/cnpj/' + cnpj,
			}).done(function (data) {
				if (data['situacao'] == 'ATIVA') {
					
					if(data['atividade_principal'][0]['code']) {
						$scope.pessoaJuridica.cnae = data['atividade_principal'][0]['code'];
					}

					if(data['fantasia']) {
						$scope.pessoaJuridica.nomeFantasia = data['fantasia'];
					}

					if(data['cep']) {
						$scope.pessoaJuridica.enderecoCep = data['cep'];
					}

					if(data['complemento']) {
						$scope.pessoaJuridica.enderecoComplemento = data['complemento'];
					}
					
					if(data['numero']) {
						$scope.pessoaJuridica.enderecoNumero = data['numero'];
					}
					
					if(data['bairro']) {
						$scope.pessoaJuridica.enderecoBairro = data['bairro'];
					}

					if(data['nome']) {
						$scope.pessoaJuridica.nome = data['nome'];
					}
					
					if(data['telefone']) {
						$scope.pessoaJuridica.telefone = data['telefone'];
					}

				} else if (data['status'] == "ERROR" || data['situacao'] == 'INATIVA') {
					$ionicPopup.alert({
						title : 'CPNJ Inválido!',
						template : 'Por favor <b>verifique</b> se os dados estão corretos'
					}).then(function() {
						$('#txtCnpj').val('');
					});
				}				
			});
		}
	};

	function apenasNumeros(string) 
	{
		var numsStr = string.replace(/[^0-9]/g,'');
		return parseInt(numsStr);
	}

	var jsonpUrl = "js/ajax/estados_cidades.json";
	$http.get(jsonpUrl)
	.then(
		function (resposta){
			console.log(resposta['data']);
			var items = [];
		    var options = '<option value="">escolha um estado</option>';  

		    $.each(resposta['data'], function (key, val) {
		      options += '<option value="' + val.nome + '">' + val.nome + '</option>';
		    });         
		    $("#txtEstado").html(options);        
		    
		    $("#txtEstado").change(function () {        
		    
		      var options_cidades = '';
		      var str = "";         
		      
		      $("#txtEstado option:selected").each(function () {
		        str += $(this).text();
		      });
		      
		      $.each(resposta['data'], function (key, val) {
		        if(val.nome == str) {             
		          $.each(val.cidades, function (key_city, val_city) {
		            options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
		          });             
		        }
		      });

		      $("#txtCidade").html(options_cidades);
		      
		    }).change(); 
		},
		function (error){
			console.log(error);
		}

	);
	
	$scope.pessoaJuridica = {
		nomeFantasia: "",
		nome: "",
		cnpj: "",
		cnae: "",
		enderecoCep: "",
		enderecoRua: "",
		enderecoBairro: "",
		enderecoNumero: "",
		enderecoComplemento: "",
		enderecoEstado: "",
		enderecoCidade: "",
		telefone: "",
		celular: "",
		email: "",
		senha: "",
		imagem: "",
		status: 1,
		dataCriacao: new Date().toISOString(),
		ultimaModificacao: new Date().toISOString(),
	}
	$scope.create = function(pessoaJuridica){
		var ref = firebase.database().ref('pessoaJuridica');
		var empresas = $firebaseArray(ref);
		
		var pessoaJuridicaIC = {
			name: pessoaJuridica.nome,
			email: pessoaJuridica.email,
			password: pessoaJuridica.senha
		}
		
		$ionicAuth.signup(pessoaJuridicaIC).then(function(){
			empresas.$add(pessoaJuridica);
			$ionicHistory.goBack(-1);
		});
	}
});

app.controller('UsuarioJuridicoUpdateCtrl', function($firebaseObject, $scope, $http, $ionicHistory, $ionicPopup, $stateParams){
	var id = $stateParams.id;
    var ref = firebase.database().ref('pessoaJuridica/'+id);
    $scope.pessoaJuridica = $firebaseObject(ref);

    $scope.update = function(pessoaJuridica){
		ref = pessoaJuridica;
		ref.$save();

        $ionicHistory.goBack(-1);
    }
});

app.controller('UsuarioFisicoCtrl', function($ionicAuth, $firebaseArray, $scope, $ionicHistory){
	$scope.goBackHandler = function(){
		$ionicHistory.goBack(-1);
	}
	$scope.pessoaFisica = {
		nome: "",
		email: "",
		senha: "",
		enderecoCep: "",
		enderecoRua: "",
		enderecoNumero: "",
		enderecoEstado: "",
		enderecoCidade: "",
		celular: "",
		status: 1,
		dataCriacao: new Date().toISOString(),
		ultimaModificacao: new Date().toISOString(),
	}

	$scope.create = function(pessoaFisica){
		var ref = firebase.database().ref('pessoaFisica');
		var usuarios = $firebaseArray(ref);
		
		var pessoaFisicaIC = {
			name: pessoaFisica.nome,
			email: pessoaFisica.email,
			password: pessoaFisica.senha
		}
		
		$ionicAuth.signup(pessoaFisicaIC).then(function(){
			usuarios.$add(pessoaFisica);
			$ionicHistory.goBack(-1);
		});
	}
});

app.controller('UsuarioFisicoUpdateCtrl', function($firebaseObject, $state, $scope, $http, $ionicHistory, $ionicPopup, $stateParams){
	var id = $stateParams.id;
    var ref = firebase.database().ref('pessoaFisica/'+id);
    $scope.pessoaFisica = $firebaseObject(ref);

    $scope.update = function(pessoaFisica){
		ref = pessoaFisica;
		ref.$save();

        $ionicHistory.goBack(-1);
    }

	$scope.showEndereco = function(id){
		$state.go('editar-user-endereco', {id: id})
	}

	$scope.goBackHandler = function(){
		$ionicHistory.goBack(-1);
	}
});

app.controller('UsuarioFisicoUpdateEnderecoCtrl', function($firebaseObject, $state, $scope, $http, $ionicHistory, $ionicPopup, $stateParams){
	var id = $stateParams.id;
    var ref = firebase.database().ref('pessoaFisica/'+id);
    $scope.pessoaFisica = $firebaseObject(ref);

    $scope.update = function(pessoaFisica){
		ref = pessoaFisica;
		ref.$save();

        $ionicHistory.goBack(-1);
    }

	$scope.goBackHandler = function(){
		$ionicHistory.goBack(-1);
	}
});