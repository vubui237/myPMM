angular.module('myPMM').service('bonusSrvc', function($http) {
    this.getBonus = (id) => {
        return $http({
            method: "GET",
            url: '/bonus/' + id

        })
    }
    this.addBonus = (authid, name, goal, current) => {
        return $http({
            method: "POST",
            url: '/bonus',
            data: {"auth_id" : authid, "name" : name, "goal" : goal, "current" : current}
        })
    }
    this.updateBonus = (bonusid, name, goal, current) => {
        return $http({
            method: "PUT",
            url: '/bonus',
            data: {"id" : bonus_id, "name" : name, "goal" : goal, "current" : current}
        })
    }
    this.deleteBonus = (id) => {
        return $http({
            method: "DELETE",
            url: '/bonus/' + id
        })
    }

})