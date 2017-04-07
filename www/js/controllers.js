app.controller('OfertaCtrl', function($scope, OfertaService, $state, $ionicHistory) {
	var listaOfertasDados = OfertaService.readAll();
	var listaOfertasProcessadas = [];

	listaOfertasDados.forEach(function(ofertaSalva){
		var valorDescontoAplicado = ofertaSalva.valorUnitario - (ofertaSalva.valorUnitario * (ofertaSalva.desconto / 100));
		
		var ofertaView = {
			id: ofertaSalva.id,
			titulo: ofertaSalva.descricao,
			enderecoImagem: ofertaSalva.enderecoImagem,
			valorUnitario: ofertaSalva.valorUnitario,
			valorPromocional: valorDescontoAplicado,
			dataLimite: ofertaSalva.dataLimite,
			desconto: ofertaSalva.desconto
		}
		listaOfertasProcessadas.push(ofertaView);
	});

	$scope.listaOfertas = listaOfertasProcessadas;
	
	$scope.showPesquisa = function(){
		$state.go('pesquisar');
	};

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
});

app.controller("LoginCtrl", function($scope, $state){
	$scope.showCadastros = function(){
		$state.go("tabNavegacao.login.register-choose");
	};
});


app.controller('UsuarioJuridicoCtrl', function($scope, $http, $ionicHistory, EmpresaCadastroService, $ionicPopup){
	
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
				console.log(data);
				if(data['status'] == "ERROR" || data['situacao'] == 'INATIVA') {
					$ionicPopup.alert({
						title : 'CPNJ Inválido!',
						template : 'Por favor <b>verifique</b> se os dados estão corretos'
					}).then(function() {
						$('#txtCnpj').val('');
					});
				} else if(data['situacao'] == 'ATIVA') {
					$ionicPopup.alert({
						title : data['nome']
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

    $scope.salvar = function(pessoaJuridica){
        EmpresaCadastroService.create(pessoaJuridica);
		EmpresaCadastroService.delete("-Kh8RH5j6MG09VE_uigX");
		//console.log(EmpresaCadastroService.read("-Kh8KMh7kNthw6n-PLAA"));
        $ionicHistory.goBack(-1);
    }
	
});

app.controller('UsuarioFisicoCtrl', function($scope, $ionicHistory){
	$scope.goBackHandler = function(){
		$ionicHistory.goBack(-1);
	}
});