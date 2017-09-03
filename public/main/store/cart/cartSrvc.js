angular.module('myPMM').service('cartSrvc', function($http) {
    this.getCart = (user_id) => {
        return $http({
            method: "GET",
            url: '/cart/' + user_id
        }).then((response)=> {
            return response.data;
        })
    }
})