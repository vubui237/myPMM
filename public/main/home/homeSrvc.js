angular.module('myPMM').service('homeSrvc', function($http) {
    this.getUser = () => { 
        return $http({
            method: "GET",
            url: "/auth/me"
        }).then((response) => {
            return response.data;
    })
    }
})