angular.module('CotacaoController', []).controller('CotacaoController', function ($scope, service) {
	$scope.listaProdutosDisponiveis = [];
	$scope.listaCotacoes = [];
	$scope.cotacao = {};
	$scope.produtoDisponivel = {};
	
	$scope.listarProdutoDisponivelCotacao = (cb) => {
        service.listarProdutosDisponiveis(function(resp){
        	if(resp.data.length){
        		$scope.listaProdutosDisponiveis = resp.data;
        		showTable();
            	hiddenNoDataMessage();
        	}else{
        		hiddenTable();
        		showNoDataMessage();
        	}
        	
        	if (cb) {
        		cb();
        	}
        });
    }
	
	$scope.salvarCotacao = function(){
		if (!validacoesAntesDeSalvar()) {
    		return;
    	}
		
    	service.inserirCotacao($scope.cotacao, function(resp){
    		alert(resp.data.message);
    		limparCotacao();
    		fecharCadastroCotacao();
    	});
    }
	
	function validacoesAntesDeSalvar() {
    	let cotacao = $scope.cotacao;
    	debugger
    	if (cotacao.valor <= 0) {
    		alert("Valor da cotação deve ser maior que zero.");
    		return false;
    	}
    	
    	return true;
    }
	
	$scope.onClickNovaCotacao = function(produtoDisponivel) {
		limparCotacao();
		abrirCadastroCotacoes();
		$scope.produtoDisponivel = produtoDisponivel;
		$scope.cotacao.produto = $scope.produtoDisponivel;
	}
	
	function limparCotacao() {
    	$scope.cotacao = {};
    }
	
	function abrirCadastroCotacoes () {
    	let modal = document.getElementsByClassName("modal-cad-cotacao")[0];

    	modal.style.display = "block";
    }
	
	function fecharCadastroCotacao () {
    	let modal = document.getElementsByClassName("modal-cad-cotacao")[0];

    	modal.style.display = "none";
     }
	
	$scope.onClickFecharCotacaoCad = function() {
		fecharCadastroCotacao();
    }
	
	function showTable(){
    	let table = document.getElementById("produtos");

    	table.style.display = "table";
    }
    
    function hiddenTable(){
    	let table = document.getElementById("produtos");

    	table.style.display = "none";
    }

    function showNoDataMessage(){
    	let noDataMsg = document.getElementsByClassName("no-data-msg")[0];

    	noDataMsg.style.display = "block";
    }
    
    function hiddenNoDataMessage(){
    	let noDataMsg = document.getElementsByClassName("no-data-msg")[0];

    	noDataMsg.style.display = "none";
    }
	
	$scope.listarProdutoDisponivelCotacao();
	
});