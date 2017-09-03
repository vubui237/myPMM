angular.module('myPMM').controller('storeCtrl', function($scope, storeSrvc) {
    storeSrvc.getStoreItems().then((response)=> {
        $scope.storeItems = response;
    })
    $scope.addItems = (name, description, image, sizes, prices) => {
        storeSrvc.addStoreItem(name, description, image, sizes, prices).then((response)=> {
            $scope.storeItems = response;
        })
    }
    $scope.updateStoreItem = (id, name, description, image, sizes, prices) => {
        storeSrvc.updateStoreItem(id, name, description, image, sizes, prices).then((response)=> {
            $scope.storeItems = response;
        })
    }
    $scope.deleteStoreItem = (id) => {
        storeSrvc.deleteStoreItem(id).then((response)=> {
            $scope.storeItems = response;
        })
    }
    $scope.addCart = (id, qty, user_id) => {
        // console.log(id, qty, user_id);
        if(qty>0 && id && user_id) {
            console.log(id, qty, user_id)
            storeSrvc.addCart(qty,id, user_id).then((response)=>{
                console.log(response);
            })
        }
    }
    $scope.qty = "0.00";

    $scope.cTc = true;
    $scope.ContinueToCart = (qty) => {
        if(qty>0) {
        $scope.cTc = !$scope.cTc;
        }
    }
    $scope.ContinueToCart2 = () => {
        $scope.cTc = !$scope.cTc;
    }
})