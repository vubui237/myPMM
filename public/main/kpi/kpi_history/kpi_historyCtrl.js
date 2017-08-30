angular.module('myPMM').controller('kpiHistoryCtrl', function($scope,kpiHistorySrvc) {
    $scope.getKPIHistory = kpiHistorySrvc.getKPIHistory().then((response) => {
        $scope.kpiHistory = response;
        // console.log(response);
    })
    $scope.displayKPI = (kpiID) => {
        // $scope.selectedKPIs = item.split("+");
        kpiHistorySrvc.getKPIHistoryByID(kpiID).then((response) => {
            console.log(response);
        })
    }
})