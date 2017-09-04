angular.module('myPMM').controller('bonusCtrl', function($scope, bonusSrvc) {
    let users_id = $scope.test2[0].authid;
    // console.log(id);
    $scope.theBonus = () => {
        bonusSrvc.getBonus(users_id).then((response) => {
            $scope.bonusData = response.data;
            // console.log($scope.bonusData);
        })
    }
    $scope.bonusColor = (current, goal) => {
        current = parseInt(current);
        goal = parseInt(goal);
        if(current > goal) {
            // console.log("I made it")
            return "progress-bar progress-bar-success"
        }
        return "progress-bar progress-bar-danger"
    }
    $scope.theBonus();
    $scope.setWidthBonusBar = (current, goal) => {
        let percentage = (current / goal) * 100;
        percentage = percentage.toString() + "%"
        // console.log(percentage);
        return {width: percentage}
    }
})