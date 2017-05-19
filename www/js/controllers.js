
app.controller('OfertaCtrl', function ($firebaseAuth, $scope, $state, $ionicHistory, $firebaseArray, $ionicPopup, $firebaseStorage) {

	$scope.oferta = {
		pessoaJuridicaId: "",
		produto: "",
		categoria: "",
		dataLimite: "",
		precoInicialUn: "",
		desconto: "",
		qtdPessoas: "",
		descricao: "",
		imagem: "img/imagePreloader.gif",
		precoFinalUn: "",
		status: "CRIANDO"
	}

	/* Mask */
	//$('.date').mask('00/00/0000');
	// $('.money').mask('000.000.000.000.000,00', { reverse: true });
	// $('.porcent').mask('00,00', { reverse: true });

	$scope.create = function (oferta) {
		$scope.authObj = $firebaseAuth();
		var firebaseUser = $scope.authObj.$getAuth();

		var ref = firebase.database().ref('ofertas');
		var ofertas = $firebaseArray(ref);

		oferta.pessoaJuridicaId = firebaseUser.uid;

		// Tratativa de armazenamento como número no banco e calculo de preço final
		// $('.oferta-precoinicial').bind();
		// $('.oferta-desconto').bind();

		var desconto = oferta.desconto;
		var precoInicial = oferta.precoInicialUn;

		// desconto     = parseFloat(desconto) * .01;
		precoInicial = parseFloat(precoInicial) * .01;

		oferta.precoInicialUn = precoInicial;
		oferta.desconto = desconto;
		oferta.precoFinalUn = calculaPrecoFinal(oferta.precoInicialUn, oferta.desconto);

		// Verificação se data limite é maior que a data atual
		data_atual = new Date();
		data_limite = new Date();

		data = oferta.dataLimite.split('/');
		data[1] = data[1] - 1;

		data_limite.setDate(data[0]);
		data_limite.setMonth(data[1]);
		data_limite.setFullYear(data[2]);

		if (oferta.precoInicialUn > 0.0) {
			if (data[0] <= 31 && data[1] <= 12 && data[2] < 2100) {
				if (data_limite >= data_atual) {
					ofertas.$add(oferta);
					
				} else {
					$ionicPopup.alert({
						title: 'Erro',
						template: 'A data limite deve ser maior que a data atual!'
					});
				}
			} else {
				$ionicPopup.alert({
					title: 'Erro',
					template: 'Coloque uma data limite válida!'
				});
			}
		} else {
			$ionicPopup.alert({
				title: 'Erro',
				template: 'O valor deve ser maior que 0!'
			});
		}
	};

	function calculaPrecoFinal(precoInicial, desconto) {
		return precoInicial - (precoInicial * (desconto / 100));
	};

	$scope.goBackHandler = function () {
		$ionicHistory.goBack(-1);
	};
	$scope.listaUrls = [];
	$scope.fileArray = [];
	$scope.idOferta = "";

	var inputFile = document.getElementById("fileInput");
	inputFile.addEventListener("change", function (event) {
		var fileList = event.target.files;

		for (var i = 0; i < fileList.length; i++) {
			$scope.fileArray.push(fileList[i]);
			var reader = new FileReader();

			reader.onload = function (e) {
				var srcImagem = reader.result;
				if (srcImagem.match(/^data:image\//)) {
					$scope.$apply(function () {
						$scope.listaUrls.push(srcImagem);
					});
				} else {
					$ionicPopup.alert({
							title: 'Erro',
							template: 'Por favor, insira uma imagem válida',
						});
					//TODO: Erro_ArquivoNaoImagem
				}
			}

			reader.readAsDataURL(fileList[i]);
		}
	});

	//Método que executa todo o processo de persistência das imagens.
	$scope.executarSalvarImagem = function (caminhoArmazenamentoImagens) {
		$("#preloader").fadeIn();
		var listaArquivos = $scope.fileArray;

		var storageRef = firebase.storage().ref(caminhoArmazenamentoImagens);
		storageRef.constructor.prototype.putFiles = function (listaArquivos) {
			var ref = this;
			return Promise.all(listaArquivos.map(function (file) {
				return ref.child(file.name).put(file);
			}));
		}

		storageRef.putFiles(listaArquivos).then(function (arrayMetadados) {
			var objetoModeloImagem = {
				ofertaId: $scope.idOferta,
				imagemUrl: ""
			}
			arrayMetadados.forEach(function (infoImagem) {
				var imagensCollection = $firebaseArray(firebase.database().ref('imagens'));
				objetoModeloImagem.imagemUrl = infoImagem.downloadURL;

				imagensCollection.$add(objetoModeloImagem).then(function (referencia) {
					console.log(referencia);
				});
			});
			$("#preloader").fadeOut();
			$ionicHistory.goBack(-1);
		}).catch(function (error) {
			console.log("deu erro");
		});
	}
});


app.controller('UpdateOfertaCtrl', function ($firebaseAuth, $firebaseObject, $scope, $state, $ionicHistory, $firebaseArray, $ionicPopup, $firebaseStorage, $stateParams) {

	$scope.authObj = $firebaseAuth();
	var firebaseUser = $scope.authObj.$getAuth();

	var id = $stateParams.id;
	var ref = firebase.database().ref('ofertas/' + id);
	$scope.oferta = $firebaseObject(ref);

	getImagensSlider(id).then(function (arrayImagens) {
		$scope.listaUrls = arrayImagens;
		//lista usada posteriormente para fazer o merge das imagens recém-salvas e imagens no firebase
		$scope.listaUrlsFirebase = arrayImagens;
	}, function (error) {
		console.log(error);
	})
	function getImagensSlider(ofertaId) {
		var refImagens = firebase.database().ref("imagens");
		var query = refImagens.orderByChild("ofertaId").equalTo(id);

		return $firebaseArray(query).$loaded(function (arrayImagensOfertaEspecifica) {
			var arrayImagensUrl = arrayImagensOfertaEspecifica.map(function (noImagem) {
				return noImagem.imagemUrl;
			});
			return arrayImagensUrl;
		});
	};

	$scope.removerImagemLista = function (urlRemovida) {
		var listaAtualizada = _.filter($scope.listaUrls, function (url) { return url != urlRemovida });
		$scope.listaUrls = listaAtualizada;
	};

	$scope.removerImagemFirebase = function (listaImagems) {
		debugger;
		var imagensFirebase = $scope.listaUrlsFirebase;
		var imagensSeremRemovidas = _.difference(imagensFirebase, listaImagems);
		var storageRef = firebase.storage();

		storageRef.constructor.prototype.removeFiles = function (imagensSeremRemovidas) {
			var ref = this;
			return Promise.all(imagensSeremRemovidas.map(function (imagemUrl) {
				return ref.refFromUrl(imagemUrl).delete();
			}));
		}

		storageRef.removeFiles(imagensSeremRemovidas).then(function (resultado) {
			console.log(resultado);
		}).catch(function (error) {
			console.log(error);
		});

	};

	/* Mask */
	$('.date').mask('00/00/0000');
	$('.money').mask('000.000.000.000.000,00', { reverse: true });
	$('.porcent').mask('00,00', { reverse: true });

	$scope.salvar = function (oferta) {
		// Tratativa de armazenamento como número no banco e calculo de preço final
		$('.oferta-precoinicial').bind();
		$('.oferta-desconto').bind();

		var desconto = oferta.desconto;
		var precoInicial = oferta.precoInicialUn;

		desconto = desconto.toString().replace('.', '').replace(',', '.');
		precoInicial = precoInicial.toString().replace('.', '').replace(',', '.');

		desconto = parseFloat(desconto);
		precoInicial = parseFloat(precoInicial);

		oferta.precoInicialUn = precoInicial;
		oferta.desconto = desconto;
		oferta.precoFinalUn = calculaPrecoFinal(oferta.precoInicialUn, oferta.desconto);

		// Verificação se data limite é maior que a data atual
		data_atual = new Date();
		data_limite = new Date();

		data = oferta.dataLimite.split('/');
		data[1] = data[1] - 1;

		data_limite.setDate(data[0]);
		data_limite.setMonth(data[1]);
		data_limite.setFullYear(data[2]);

		if (oferta.precoInicialUn > 0.0) {
			if (data[0] <= 31 && data[1] <= 12 && data[2] < 2100) {
				if (data_limite >= data_atual) {
					ref = oferta;
					ref.$save().then(function (referencia) {
						var idOfertaSalva = referencia.key;
						$scope.idOferta = idOfertaSalva;
						var idPessoaJuridica = firebaseUser.uid;
						var caminhoArmazenamentoImagens = idPessoaJuridica + "/" + idOfertaSalva + "/";

						$scope.removerImagemFirebase($scope.listaUrls, caminhoArmazenamentoImagens);
						$scope.executarSalvarImagem(caminhoArmazenamentoImagens);
					});
				} else {
					$ionicPopup.alert({
						title: 'Erro',
						template: 'A data limite deve ser maior que a data atual!'
					});
				}
			} else {
				$ionicPopup.alert({
					title: 'Erro',
					template: 'Coloque uma data limite válida!'
				});
			}
		} else {
			$ionicPopup.alert({
				title: 'Erro',
				template: 'O valor deve ser maior que 0!'
			});
		}
	};

	$scope.finalizar = function (oferta) {
		oferta.status = "AGUARDANDO";
		$scope.salvar(oferta);
	};

	function calculaPrecoFinal(precoInicial, desconto) {
		return precoInicial - (precoInicial * (desconto / 100));
	};

	$scope.goBackHandler = function () {
		$ionicHistory.goBack(-1);
	};
	$scope.listaUrls = [];
	$scope.fileArray = [];
	$scope.idOferta = "";

	var inputFile = document.getElementById("fileInput");
	inputFile.addEventListener("change", function (event) {
		var fileList = event.target.files;

		for (var i = 0; i < fileList.length; i++) {
			$scope.fileArray.push(fileList[i]);
			var reader = new FileReader();

			reader.onload = function (e) {
				var srcImagem = reader.result;
				if (srcImagem.match(/^data:image\//)) {
					$scope.$apply(function () {
						$scope.listaUrls.push(srcImagem);
					});
				} else {

					$ionicPopup.alert({
							title: 'Erro',
							template: 'Por favor, insira uma imagem válida'
						});

					//TODO: Erro_ArquivoNaoImagem
				}
			}

			reader.readAsDataURL(fileList[i]);
		}
	});

	//Método que executa todo o processo de persistência das imagens.
	$scope.executarSalvarImagem = function (caminhoArmazenamentoImagens) {
		$("#preloader").fadeIn();
		var listaArquivos = $scope.fileArray;

		var storageRef = firebase.storage().ref(caminhoArmazenamentoImagens);
		storageRef.constructor.prototype.putFiles = function (listaArquivos) {
			var ref = this;
			return Promise.all(listaArquivos.map(function (file) {
				return ref.child(file.name).put(file);
			}));
		}

		storageRef.putFiles(listaArquivos).then(function (arrayMetadados) {
			var objetoModeloImagem = {
				ofertaId: $scope.idOferta,
				imagemUrl: ""
			}
			arrayMetadados.forEach(function (infoImagem) {
				var imagensCollection = $firebaseArray(firebase.database().ref('imagens'));
				objetoModeloImagem.imagemUrl = infoImagem.downloadURL;

				imagensCollection.$add(objetoModeloImagem).then(function (referencia) {
					console.log(referencia);
				});
			});
			$("#preloader").fadeOut();
			$ionicHistory.goBack(-1);
		}).catch(function (error) {
			console.log("deu erro");
		});
	}
});


// app.controller('OfertaUpdateCtrl', function ($firebaseObject, $scope, $http, $ionicHistory, $ionicPopup, $stateParams) {
// 	var id = $stateParams.id;
// 	var ref = firebase.database().ref('ofertas/' + id);
// 	$scope.oferta = $firebaseObject(ref);

// 	$scope.salvar = function (oferta) {
// 		ref = oferta;
// 		ref.$save();
// 	}

// 	$scope.goBackHandler = function () {
// 		$ionicHistory.goBack(-1);
// 	}
// });

app.controller('OfertaListaCtrl', function ($ionicPlatform, $ionicViewSwitcher, $state, $firebaseAuth, $firebaseArray, $scope, $http, $ionicHistory, $ionicPopup) {

	$ionicPlatform.ready(function () {
		// Tratativa de continuar sessão.
		// var firebaseUser = $firebaseAuth().$getAuth();
		// //Se já estiver logado
		// if (firebaseUser) {
		// 	var ref = firebase.database().ref('pessoaJuridica/'+firebaseUser.uid+'/cnpj');
		// 	$firebaseObject(ref).$loaded(function(cnpj){
		// 		if (cnpj.$value != null){
		// 			$state.go('tabsJuridicoLogado.home');
		// 		}else{
		// 			$state.go('tabsFisicoLogado.home');
		// 		}
		// 	});
		// }

		$("#preloader").fadeIn();
		getObjOfertaComImagem();
	});

	function getObjOfertaComImagem() {
		var ref = firebase.database().ref('ofertas');
		$firebaseArray(ref).$loaded(function (dadosOfertas) {
			dadosOfertas = dadosOfertas.map(function (oferta) {
				getImagemExibicao(oferta.$id).then(function (urlImagem) {
					oferta.imagem = urlImagem;
				});
				return oferta;
			});
			$scope.ofertas = dadosOfertas;
			$("#preloader").fadeOut();
		});
	}

	function getImagemExibicao(ofertaId) {
		var refImagens = firebase.database().ref("imagens");
		var query = refImagens.orderByChild("ofertaId").equalTo(ofertaId);

		return $firebaseArray(query).$loaded(function (arrayImagensOfertaEspecifica) {
			var arrayImagensUrl = arrayImagensOfertaEspecifica.map(function (noImagem) {
				return noImagem.imagemUrl;
			});
			return arrayImagensUrl[0];
		});
	};

	$scope.showOferta = function (id) {
		$ionicViewSwitcher.nextDirection("forward");
		$state.go('visualizar-oferta', { id: id });
	}

	$scope.goBackHandler = function () {
		$ionicHistory.goBack(-1);
	}
});
app.controller('MinhasOfertasCtrl', function ($ionicViewSwitcher, $state, $firebaseObject, $firebaseAuth, $firebaseArray, $scope, $http, $ionicHistory, $ionicPopup, $ionicLoading) {

	$('#preloader').fadeIn();

	var firebaseUser = $firebaseAuth().$getAuth();
	var ref = firebase.database().ref('ofertas');

	var query = ref.orderByChild("pessoaJuridicaId").equalTo(firebaseUser.uid);

	$firebaseArray(query).$loaded(function (array) {
		$('#preloader').fadeOut();

		var arrayAprovadas = [];
		var arrayAguardando = [];
		var arrayCriando = [];
		var arrayRecusadas = [];

		array.forEach(function (item, index) {
			if (item.status == 'APROVADO') {
				arrayAprovadas.push(item);
			} else if (item.status == 'AGUARDANDO') {
				arrayAguardando.push(item);
			} else if (item.status == 'CRIANDO') {
				arrayCriando.push(item);
			} else if (item.status == 'RECUSADO') {
				arrayRecusadas.push(item);
			}		
		});

		$scope.ofertasAprovadasPorPessoaJuridica = arrayAprovadas;
		$scope.ofertasAguardandoPorPessoaJuridica = arrayAguardando;
		$scope.ofertasCriandoPorPessoaJuridica = arrayCriando;
		$scope.ofertasRecusadasPorPessoaJuridica = arrayRecusadas;
	});

	$scope.showOpcoesOfertas = function (id) {
		var refStatus = firebase.database().ref('ofertas/' + id);
		$firebaseObject(refStatus).$loaded(function (oferta) {
			if (oferta.status == 'APROVADO') {
				$ionicViewSwitcher.nextDirection('forward');
				$state.go('visualizar-oferta', { id: id });
			}
			else if (oferta.status == 'CRIANDO') {
				$state.go('tabsJuridicoLogado.editarOferta', { id: id });
			}
			else if (oferta.status == 'RECUSADO') {

			}
		});
	}

	$scope.goBackHandler = function () {
		$ionicHistory.goBack(-1);
	}
});

app.controller('VisualizarOfertaCtrl', function ($firebaseArray, $stateParams, $firebaseObject, $state, $scope, $ionicHistory, $ionicSlideBoxDelegate) {
	var empresa;
	var ofertaId = $stateParams.id;
	var ref = firebase.database().ref('ofertas/' + ofertaId);

	getImagensSlider(ofertaId).then(function (arrayImagens) {
		$scope.imagensUrlSlider = arrayImagens;
	}, function (error) {
		console.log(error);
	})
	function getImagensSlider(ofertaId) {
		var refImagens = firebase.database().ref("imagens");
		var query = refImagens.orderByChild("ofertaId").equalTo(ofertaId);

		return $firebaseArray(query).$loaded(function (arrayImagensOfertaEspecifica) {
			var arrayImagensUrl = arrayImagensOfertaEspecifica.map(function (noImagem) {
				return noImagem.imagemUrl;
			});
			return arrayImagensUrl;
		});
	};

	$firebaseObject(ref).$loaded(function (oferta) {
		var refEmpresa = firebase.database().ref('pessoaJuridica/' + oferta.pessoaJuridicaId);
		$firebaseObject(refEmpresa).$loaded(function (empresa) {
			$scope.empresa = empresa;
			$scope.oferta = oferta;
		});
	});

	$scope.options = {
		loop: true,
		effect: 'slide',
		speed: 500,
	}

	$scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
		$scope.slider = data.slider;
	});

	$scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
		console.log('Slide change is beginning');
	});

	$scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
		$scope.activeIndex = data.slider.activeIndex;
		$scope.previousIndex = data.slider.previousIndex;
	});

	$scope.goBackHandler = function () {
		$ionicHistory.goBack(-1);
	}

	$scope.showDescricao = function (id) {
		$state.go('descricao', { id: id });
	}

	$scope.showEmpresa = function (id) {
		$state.go('perfil-empresa', { id: id });
	}
	
});

app.controller('CategoriaCtrl', function ($ionicViewSwitcher, $scope, CategoriaService, $state, $ionicHistory) {
	$scope.categorias = CategoriaService.readAll();

	//aguardando implementação das ofertas na home e id de filtro na url
	$scope.filterHome = function (categoriaId) {
		$ionicViewSwitcher.nextDirection("forward");
		$state.go('categoriaOfertas', { id: categoriaId });
	};

	$scope.goBackHandler = function () {
		$ionicHistory.goBack(-1);
	}

	$scope.showPersonalizar = function () {
		$state.go('tabsNaoLogado.explore.personalizar-categorias');
	};

	$scope.trocaImagem = function (i) {
		var c = $scope.categorias[i];
		var endereco = angular.copy(c.img);

		if (endereco.search('colored') != -1) {
			c.img = endereco.replace("colored", "outlined");
		}
		else {
			c.img = endereco.replace("outlined", "colored");
		}

		$scope.categorias[i].img = c.img;
	}
});

app.controller('SearchCtrl',
	function ($scope, PesquisaService, $state, $ionicHistory) {

		$scope.pesquisas = PesquisaService.readAll();

		$scope.goBackHandler = function () {
			$ionicHistory.goBack(-1);
		};

	});

app.controller('OfertasApoiadasCtrl',
	function ($scope, OfertasApoiadasService, OfertasRealizadasService, OfertasIncompletasService, $state, $ionicHistory) {

		$scope.apoiadas = OfertasApoiadasService.readAll();
		$scope.realizadas = OfertasRealizadasService.readAll();
		$scope.incompletas = OfertasIncompletasService.readAll();

		$scope.showIndex = function () {
			$state.go('oferta-lista');
		};

		$scope.showAndamento = function () {
			$state.go('ofertas-apoiadas');
		};

		$scope.showRealizadas = function () {
			$state.go('ofertas-apoiadas-realizadas');
		};

		$scope.showIncompletas = function () {
			$state.go('ofertas-apoiadas-incompletas');
		};
		$scope.goBackHandler = function () {
			$ionicHistory.goBack(-1);
		}
	});

app.controller('NotificationCtrl',
	function ($scope, NotificationService, $state) {

		$scope.notification = NotificationService.readAll();

		$scope.showIndex = function () {
			$state.go('oferta-lista');
		};

	});

app.controller('RegisterChooseCtrl', function ($scope, $state, $ionicHistory) {
	$scope.goBackHandler = function () {
		$ionicHistory.goBack(-1);
	}

	$scope.showUpdate = function (id) {
		$state.go('editar-empresa', { id: id })
	}
});

app.controller("LoginCtrl", function ($scope, $state, $firebaseAuth, $firebaseObject, $ionicLoading, $ionicPopup, $ionicViewSwitcher) {

	$scope.login = function (usuario) {
		if ($('#txtEmail').val().length > 0 && $('#txtSenha').val().length > 0) {
			$('#preloader').fadeIn();

			$firebaseAuth().$signInWithEmailAndPassword(usuario.email, usuario.password)
				.then(function (firebaseUser) {
					var ref = firebase.database().ref('pessoaJuridica/' + firebaseUser.uid + '/cnpj');
					var pessoaJuridica = $firebaseObject(ref).$loaded(function (cnpj) {
						if (cnpj.$value != null) {
							$ionicViewSwitcher.nextDirection("back");
							$state.go('tabsJuridicoLogado.home');
						} else if (usuario.email = "admin@admin.com"){
							$state.go('ofertas-triagem');
						}						
						else {
							$ionicViewSwitcher.nextDirection("forward");
							$state.go('tabsFisicoLogado.home');
						}
					});
					limparCamposCadastro();
					$('#preloader').fadeOut();
				})
				.catch(function (error) {
					setTimeout(function () {
						$('#preloader').fadeOut();
					}, 800);
					setTimeout(function () {
						$ionicPopup.alert({
							title: 'Erro',
							template: 'Email/Senha inválidos!'
						});
					}, 1200);
				});
		} else {
			$('#preloader').fadeOut();
			$ionicPopup.alert({
				title: 'Erro',
				template: 'Email/Senha estão em branco.'
			});
		}

	};

	function limparCamposCadastro() {
		$("#txtEmail").val("");
		$("#txtSenha").val("");
	}

	$scope.showCadastros = function () {
		$state.go("tabsNaoLogado.register-choose");
	};
});

app.controller('UsuarioJuridicoCtrl', function ($firebaseAuth, $firebaseObject, $scope, $http, $ionicHistory, $ionicPopup, $state, $ionicViewSwitcher) {

	/* Mask */
	$('.date').mask('00/00/0000');
	$('.time').mask('00:00:00');
	$('.date_time').mask('00/00/0000 00:00:00');
	$('.cep').mask('00000-000');
	$('.cpf').mask('000.000.000-00');
	$('.cnpj').mask('00.000.000/0000-00');
	$('.money').mask('000.000.000.000.000,00', { reverse: true });

	var SPMaskBehavior = function (val) {
		return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
	},
		spOptions = {
			onKeyPress: function (val, e, field, options) {
				field.mask(SPMaskBehavior.apply({}, arguments), options);
			}
		};

	if ($('.phone').length > 0) {
		$('.phone').mask(SPMaskBehavior, spOptions);
	}

	/* validate */
	$('form').submit(function () {
		var valid = $(this).validationEngine("validate");
		if (valid) {
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

	$('input').blur(function () {

		var field_id = $(this).attr('id');

		var isValid = !$(this).validationEngine('validate');

		if (!isValid) {
			$(this).addClass('validation_error');
		} else {
			$(this).removeClass('validation_error');
		}

	});

	/* /validate */
	$scope.goBackHandler = function () {
		$ionicHistory.goBack(-1);
	}

	var cnpj;

	$scope.validarCnpj = function () {

		cnpj = apenasNumeros($('#txtCnpj').val());

		if (cnpj > 0) {
			$('#preloader').fadeIn();
			$.ajax({
				dataType: 'jsonp',
				url: 'https://www.receitaws.com.br/v1/cnpj/' + cnpj,
			}).done(function (data) {
				if (data['situacao'] == 'ATIVA') {

					if (data['atividade_principal'][0]['code']) {
						$scope.pessoaJuridica.cnae = data['atividade_principal'][0]['code'];
					}

					if (data['fantasia']) {
						$scope.pessoaJuridica.nomeFantasia = data['fantasia'];
					}

					if (data['cep']) {
						$scope.pessoaJuridica.enderecoCep = data['cep'];
					}

					if (data['complemento']) {
						$scope.pessoaJuridica.enderecoComplemento = data['complemento'];
					}

					if (data['numero']) {
						$scope.pessoaJuridica.enderecoNumero = data['numero'];
					}

					if (data['bairro']) {
						$scope.pessoaJuridica.enderecoBairro = data['bairro'];
					}

					if (data['nome']) {
						$scope.pessoaJuridica.nome = data['nome'];
					}

					if (data['telefone']) {
						$scope.pessoaJuridica.telefone = data['telefone'];
					}



				} else if (data['status'] == "ERROR" || data['situacao'] == 'INATIVA') {
					$ionicPopup.alert({
						title: 'CPNJ Inválido!',
						template: 'Por favor <b>verifique</b> se os dados estão corretos'
					}).then(function () {
						$('#txtCnpj').val('');
						//teste
					});
				}
			});
			$('#preloader').fadeOut();
		};
	}

	function apenasNumeros(string) {
		var numsStr = string.replace(/[^0-9]/g, '');
		return parseInt(numsStr);
	}

	var jsonpUrl = "lib/base_enderecos/estados_cidades.json";
	$http.get(jsonpUrl)
		.then(
		function (resposta) {
			console.log(resposta['data']);
			var items = [];
			var options = '<option value="">Escolha um estado</option>';

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
					if (val.nome == str) {
						$.each(val.cidades, function (key_city, val_city) {
							options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
						});
					}
				});

				$("#txtCidade").html(options_cidades);

			}).change();
		},
		function (error) {
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
		imagem: "",
		status: 1,
		dataCriacao: new Date().toISOString(),
		ultimaModificacao: new Date().toISOString(),
	}

	$scope.create = function (pessoaJuridica) {

		if (pessoaJuridica.password == pessoaJuridica.confirmPassword) {
			$firebaseAuth().$createUserWithEmailAndPassword(pessoaJuridica.email, pessoaJuridica.password)
				.then(function (firebaseUser) {
					$('#preloader').fadeIn();
					addPessoaJuridica(firebaseUser);
					$state.go('tabsNaoLogado.login');
					$('#preloader').fadeOut();
				})

				.catch(function (error) {

				});

		} else {
			alert("Senhas inválidas");
		}
	}

	function addPessoaJuridica(firebaseUser) {
		var ref = firebase.database().ref('pessoaJuridica/' + firebaseUser.uid);
		var obj = $firebaseObject(ref);

		obj = _.extend(obj, $scope.pessoaJuridica);
		delete obj.password;
		delete obj.confirmPassword;
		obj.$save();
		$ionicHistory.goBack(-1);
	}

	$scope.showUpdateJuridica = function (id) {
		$state.go('editar-empresa', { id: id })
	}

	$scope.logout = function () {
		$('#preloader').fadeIn();
		firebase.auth().signOut();
		$ionicViewSwitcher.nextDirection("forward");
		$state.go("tabsNaoLogado.home");
		$('#preloader').fadeOut();
	}

});


app.controller('UsuarioJuridicoUpdateCtrl', function ($ionicPlatform, $firebaseAuth, $firebaseObject, $scope, $http, $ionicHistory, $ionicPopup, $stateParams) {

	var jsonpUrl = "lib/base_enderecos/estados_cidades.json";

	$scope.authObj = $firebaseAuth();
	var firebaseUser = $scope.authObj.$getAuth();

	$ionicPlatform.ready(function () {
		$('#preloader').fadeIn();
		var ref = firebase.database().ref('pessoaJuridica/' + firebaseUser.uid);
		$firebaseObject(ref).$loaded(function (dadosJuridica) {
			$scope.pessoaJuridica = dadosJuridica;
			var estado = dadosJuridica.enderecoEstado;
			var cidade = dadosJuridica.enderecoCidade;

			$http.get(jsonpUrl)
				.then(
				function (resposta) {
					console.log(resposta['data']);
					var items = [];
					var options = '<option value="">Escolha um estado</option>';

					$.each(resposta['data'], function (key, val) {
						options += '<option value="' + val.nome + '">' + val.nome + '</option>';
					});
					$("#txtEstado").html(options);
					$("#txtEstado").val(estado);

					$("#txtEstado").change(function () {

						var options_cidades = '';
						var str = "";

						$("#txtEstado option:selected").each(function () {
							str += $(this).text();
						});

						$.each(resposta['data'], function (key, val) {
							if (val.nome == str) {
								$.each(val.cidades, function (key_city, val_city) {
									options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
								});
							}
						});

						$("#txtCidade").html(options_cidades);
						$("#txtCidade").val(cidade);

					}).change();
				},
				function (error) {
					console.log(error);
				}

				);

			$('#preloader').fadeOut();
		});
	});

	$scope.update = function (pessoaJuridica) {
		ref = pessoaJuridica;
		ref.$save();

		$ionicHistory.goBack(-1);
	}
	$scope.goBackHandler = function () {
		$ionicHistory.goBack(-1);
	}
});

app.controller('UsuarioFisicoCtrl', function ($firebaseAuth, $firebaseObject, $scope, $ionicHistory, $state, $ionicPopup, $ionicViewSwitcher) {
	$scope.goBackHandler = function () {
		$ionicHistory.goBack(-1);
	}
	$scope.pessoaFisica = {
		nome: "",
		email: "",
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

	$scope.create = function (pessoaFisica) {
		if (pessoaFisica.password == pessoaFisica.confirmPassword) {
			$firebaseAuth().$createUserWithEmailAndPassword(pessoaFisica.email, pessoaFisica.password)
				.then(function (firebaseUser) {
					addPessoaFisica(firebaseUser);
					$ionicPopup.alert({
						title: 'Cadastro feito com sucesso',
						template: 'Você está pronto pra efetuar seu login!'
					}).then(function () {
						limpaCamposCadastro();
						$state.go('tabsNaoLogado.login');
					});
				})
				.catch(function (error) {
					switch (error.code) {
						case 'auth/email-already-in-use': tratarEmailJaExistente();
					}
				});
		}
		else {
			$ionicPopup.alert({
				title: 'Senhas não coincidem',
				template: 'Por favor informe as senhas corretamente'
			});
		}
	}
	function tratarEmailJaExistente() {
		$ionicPopup.alert({
			title: 'Este email já está cadastrado em nosso sistema',
			template: 'Por favor verifique se o email está correto, ou informe outro diferente.'
		}).then(function () {
			$("#txtEmail").val("");
		});
	}

	function limpaCamposCadastro() {
		$scope.pessoaFisica.nome = "";
		$scope.pessoaFisica.email = "";
		$scope.pessoaFisica.password = "";
		$scope.pessoaFisica.confirmPassword = "";
	}
	function addPessoaFisica(firebaseUser) {
		var ref = firebase.database().ref('pessoaFisica/' + firebaseUser.uid);
		var obj = $firebaseObject(ref);

		obj = _.extend(obj, $scope.pessoaFisica);
		delete obj.password;
		delete obj.confirmPassword;
		obj.$save();
	}

	$scope.logout = function () {
		firebase.auth().signOut();
		$ionicViewSwitcher.nextDirection("back");
		$state.go("tabsNaoLogado.home");
	}

});

app.controller('UsuarioFisicoUpdateCtrl', function ($firebaseObject, $state, $scope, $http, $ionicHistory, $ionicPopup, $stateParams) {
	var id = $stateParams.id;
	var ref = firebase.database().ref('pessoaFisica/' + id);
	$scope.pessoaFisica = $firebaseObject(ref);

	$scope.update = function (pessoaFisica) {
		ref = pessoaFisica;
		ref.$save();

		$ionicHistory.goBack(-1);
	}

	$scope.showEndereco = function (id) {
		$state.go('editar-user-endereco', { id: id })
	}

	$scope.goBackHandler = function () {
		$ionicHistory.goBack(-1);
	}

});

app.controller('UsuarioFisicoUpdateEnderecoCtrl', function ($firebaseObject, $state, $scope, $http, $ionicHistory, $ionicPopup, $stateParams) {
	var id = $stateParams.id;
	var ref = firebase.database().ref('pessoaFisica/' + id);
	$scope.pessoaFisica = $firebaseObject(ref);

	$scope.update = function (pessoaFisica) {
		ref = pessoaFisica;
		ref.$save();

		$ionicHistory.goBack(-1);
	}

	$scope.goBackHandler = function () {
		$ionicHistory.goBack(-1);
	}
});

app.controller('ValidacaoCtrl', function ($ionicScrollDelegate, $location, $scope) {
	$scope.submit = function (form) {
		$scope.submitted = true;

		if (form.$invalid) {
			var formInputs = [];

			angular.forEach(form, function (item) {
				//verifica se o item do formControll é um objeto de input e se está inválido
				if (typeof item === 'object' && item.hasOwnProperty('$modelValue') && item.$invalid) {
					formInputs.push(item)
				}
			});

			$location.hash(formInputs[0].$name);
			$ionicScrollDelegate.anchorScroll(true);
		}
	}
});

app.controller('CategoriaOfertasCtrl', function ($ionicHistory, $state, $ionicViewSwitcher, $firebaseArray, $ionicPlatform, $scope, $stateParams) {

	$ionicPlatform.ready(function () {
		$("#preloader").fadeIn();
		getObjOfertaComImagem();
	});

	function getObjOfertaComImagem() {
		var categoriaId = $stateParams.id;
		$scope.tituloHeaderBar = categoriaId;
		var refOfertas = firebase.database().ref("ofertas");
		var query = refOfertas.orderByChild("categoria").equalTo(categoriaId);
		$firebaseArray(query).$loaded(function (dadosOfertas) {
			dadosOfertas = dadosOfertas.map(function (oferta) {
				getImagemExibicao(oferta.$id).then(function (urlImagem) {
					oferta.imagem = urlImagem;
				});
				return oferta;
			});
			$scope.ofertas = dadosOfertas;
			$("#preloader").fadeOut();
		});
	}

	function getImagemExibicao(ofertaId) {
		var refImagens = firebase.database().ref("imagens");
		var query = refImagens.orderByChild("ofertaId").equalTo(ofertaId);

		return $firebaseArray(query).$loaded(function (arrayImagensOfertaEspecifica) {
			var arrayImagensUrl = arrayImagensOfertaEspecifica.map(function (noImagem) {
				return noImagem.imagemUrl;
			});
			return arrayImagensUrl[0];
		});
	};

	$scope.showOferta = function (id) {
		$ionicViewSwitcher.nextDirection("forward");
		$state.go('visualizar-oferta', { id: id });
	}

	$scope.goBackHandler = function () {
		$ionicViewSwitcher.nextDirection("back");
		$ionicHistory.goBack(-1);
	};

});

app.controller('PerfilEmpresa', function ($firebaseObject, $state, $scope, $ionicHistory, $stateParams) {
	$("#preloader").fadeIn();

	var id = $stateParams.id;
	var ref = firebase.database().ref('pessoaJuridica/' + id);

	$firebaseObject(ref).$loaded(function (empresa) {
		$scope.pessoaJuridica = empresa;
		$scope.enderecoRua = empresa.enderecoRua + ', ' + empresa.enderecoNumero;
		$scope.enderecoCidade = empresa.enderecoCep + ' ' + empresa.enderecoCidade + ' - ' + empresa.enderecoEstado;
		$("#preloader").fadeOut();
	});

	$scope.goBackHandler = function () {
		$ionicHistory.goBack(-1);
	}
});


app.controller('OfertaTriagemCtrl', function($ionicViewSwitcher, $firebaseAuth, $firebaseArray, $firebaseObject, $state, $scope, $ionicHistory, $stateParams) {
	$("#preloader").fadeIn();

	var id = $stateParams.id;
	var ref = firebase.database().ref('ofertas');

	var query = ref.orderByChild("status").equalTo("AGUARDANDO");

	$firebaseArray(query).$loaded(function (ofertas) {
		$scope.ofertas = ofertas;
		$("#preloader").fadeOut();
	});

	$scope.showVisualizarOferta = function(id){
		$state.go('visualizar-oferta-triagem', { id: id });
	}
	
	$scope.logout = function () {
		$('#preloader').fadeIn();
		firebase.auth().signOut();
		$ionicViewSwitcher.nextDirection("back");
		$state.go("tabsNaoLogado.home");
     	$('#preloader').fadeOut();
	} 

	$scope.goBackHandler = function () {
		$ionicHistory.goBack(-1);
	}
});

app.controller('VisualizarOfertaTriagemCtrl', function($firebaseObject, $state, $scope, $ionicHistory, $stateParams) {

	var id = $stateParams.id;
	var ref = firebase.database().ref('ofertas/' + id);
	$scope.oferta = $firebaseObject(ref);

	$scope.aprovar = function(){
		$scope.oferta.status = "APROVADO";
		$scope.oferta.$save();
		$ionicHistory.goBack(-1);
	};

	$scope.recusar = function(){
		$scope.oferta.status = "RECUSADO";
		$scope.oferta.$save();
		$ionicHistory.goBack(-1);
	};

	$scope.goBackHandler = function () {
		$ionicHistory.goBack(-1);
	}
	
});
