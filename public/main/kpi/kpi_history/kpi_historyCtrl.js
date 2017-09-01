angular.module('myPMM').controller('kpiHistoryCtrl', function($scope,kpiHistorySrvc) {
    $scope.getKPIHistory = kpiHistorySrvc.getKPIHistory().then((response) => {
        $scope.kpiHistory = response;
        // console.log(response);
    })
    $scope.displayKPI = (kpidatas) => {
        $scope.selectedKPIs = kpidatas.split("+");
        // console.log($scope.selectedKPIs);
        kpiHistorySrvc.getKPIHistoryByID($scope.selectedKPIs[0]).then((response) => {
            $scope.infoKPI = response;
        })
    }
    $scope.displayExceededKPI = (kpidatas) => {
        $scope.selectedKPIs = kpidatas.split("+");
        // console.log($scope.selectedKPIs);
        kpiHistorySrvc.getKPIHistoryByID($scope.selectedKPIs[0]).then((response) => {
            $scope.infoKPI = response;
            $scope.infoKPI2 = [];
            $scope.infoKPI.map((x)=> { (x.data<$scope.selectedKPIs[2] || x.data>$scope.selectedKPIs[3]) ? $scope.infoKPI2.push(x) : 0 })
            // console.log($scope.infoKPI);
            $scope.infoKPI = ($scope.infoKPI2)
        })
    }
    $scope.exportData = function () {
        var blob = new Blob([document.getElementById('excelExport').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
    };
})