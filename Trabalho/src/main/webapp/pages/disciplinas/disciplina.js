module = angular.module("Prova", []);

module.controller("DisciplinaController", ["$scope","$http", DisciplinaController]);


function DisciplinaController($scope,$http) {
    
    $scope.iniciar = funcaoIniciar;
    $scope.salvar = funcaoSalvar;
    $scope.excluir = funcaoExcluir;
    $scope.editar = funcaoEditar;
    
    $scope.disciplinas = [];
    $scope.disciplina = {};
    $scope.isNovo = true;
    
    function funcaoEditar(vitima) {
        $scope.disciplina = angular.copy(vitima);
        $scope.isNovo = false;
    }

    
    function funcaoExcluir(vitima) {
        $http.delete("/disciplinas/" + vitima.id).success(onSuccess).error(onError);
        function onSuccess(data, status){
            console.log(data);
            funcaoCarregar();
        }
        function onError(data, status){
            alert("esta errado", +data);
        }
    }
    
    function funcaoSalvar() {
        if($scope.isNovo){
            $http.post("/disciplinas",$scope.disciplina).success(onSuccess).error(onError);
        }else{
            $http.put("/disciplinas",$scope.disciplina).success(onSuccess).error(onError);
        }
        function onSuccess(data, status){
            console.log(data);
            funcaoCarregar();
            $scope.disciplina={};
            $scope.isNovo=true;
            
        }
        function onError(data, status){
            alert("esta errado", + data);
        }
    }
   // }
    
    function funcaoCarregar() {
        $http.get("/disciplinas").success(onSuccess).error(onError);
        
        function onSuccess(data, status) {
            $scope.disciplinas = data;       
            console.log(data);
        }
        function onError(data, status) {
            alert("Deu erro: " + data);
        }
    }
    
    function funcaoIniciar() {
        funcaoCarregar();
        console.log(">>> veículos carregados....");
    }
        
}


