angular.module('myPMM').controller('homeCtrl', function($scope, homeSrvc) {
    $scope.test = () => {
        homeSrvc.getUser().then((response) => {
        $scope.test2 = response;
        })
    }
$scope.test();


})