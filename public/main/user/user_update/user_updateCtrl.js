angular.module('myPMM').controller('userUpdateCtrl', function($scope, userUpdateSrvc) {
    //$scope.userInfo = $scope.test2[0], After pulling the data, put it in a list to be selectable.
    $scope.getDatabaseAccounts = userUpdateSrvc.getDBAccount().then((data)=> {
        $scope.userInfos = data;
        console.log($scope.userInfos);
    })
    $scope.updateDetails = (authid, avatar, level, kpi) => {
        userUpdateSrvc.pushDatabaseDetails(authid, avatar,level,kpi).then((response) => {
                    if(response) {
                        alert("User details updated successfully")
                    }
                    else {
                        alert("User details failed to update")
                    }
        })
    }


})