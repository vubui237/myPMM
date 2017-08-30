angular.module('myPMM').controller('userUpdateCtrl', function($scope, userUpdateSrvc) {
    //$scope.userInfo = $scope.test2[0], After pulling the data, put it in a list to be selectable.
    $scope.selectedUser = null;
    $scope.selectedUserx = null;
    $scope.getDatabaseAccounts = userUpdateSrvc.getDBAccount().then((data)=> {
        $scope.userInfos = []
        $scope.userInfosx = []
        data.map((x)=> { x.level > 0 ? $scope.userInfos.push(x) : $scope.userInfosx.push(x)})
        // console.log("not 0", $scope.userInfos);
        // console.log("level 0", $scope.userInfosx);
    })
    $scope.submitUpdate = () => {
        $scope.selectedUsers = $scope.selectedUser.split("+");
    }
    $scope.submitUpdatex = () => {
        $scope.selectedUsersx = $scope.selectedUserx.split("+");
    }
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