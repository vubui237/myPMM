angular.module('myPMM').controller('homeCtrl', function($scope, homeSrvc) {
    
    $scope.test = () => {
        homeSrvc.getUser().then((response) => {
        $scope.test2 = response;
        if($scope.test2[0].level > 0) {
            $scope.level = true;
            $scope.levelActivation = false;
        }
        if($scope.test2[0].level == 0) {
            console.log("hiya")
            $scope.level = false;
            $scope.levelActivation = true;
        }
        })
    }
$scope.test();



})