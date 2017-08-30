angular.module('myPMM').controller('kpiAddCtrl', function($scope, kpiAddSrvc) {
    $scope.addNewKPI = (kTitle, kpiLL, kpiUL, cLL, cUL) => {
        kpiAddSrvc.addNewKPI(kTitle, kpiLL, kpiUL, cLL, cUL).then((response)=> {
            if(response) {
                alert("KPI Successfully Added")
            }
            else {
                alert('KPI data entered incorrectly')
            }
        })
    }
})