angular.module('myPMM').service('kpiHistorySrvc', function($http) {
    this.getKPIHistory = () => {
        return $http({
            method: "GET",
            url: "/kpihistory"
        }).then((response) => {
            return response.data;
        })
    }
    this.getKPIHistoryByID = (id) => {
        return $http({
            method: "GET",
            url: "/kpihistory/" + id
        }).then((response) => {
            return response.data;
        })
    }
})