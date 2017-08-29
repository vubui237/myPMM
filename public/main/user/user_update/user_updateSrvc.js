angular.module('myPMM').service('userUpdateSrvc', function($http) {
    this.pushDatabaseDetails = (authid, avatar, level, kpi) => { 
        return $http({
            method: "PUT",
            url: "/userupdate",
            data: {"authid" : authid, "avatar" : avatar, "level" : level, "assigned_kpis" : kpi}
        })
    },
    this.getDBAccount = () => {
        return $http({
            method: "GET",
            url: "/getusers"
        }).then((response) => {
            return response.data
        })
    }
})