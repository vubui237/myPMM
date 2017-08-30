angular.module('myPMM').service('kpiAddSrvc', function($http) {
    this.addNewKPI = (kTitle, kpiLL, kpiUL, cLL, cUL) => {
        return $http({
            method: "POST",
            url: '/addNewKPI',
            data: {"title": kTitle, "kpi_lower_limit" : kpiLL, "kpi_upper_limit" : kpiUL, "chart_lower_limit" : cLL, "chart_upper_limit" : cUL}
        })
    }
})