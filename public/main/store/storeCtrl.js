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
    $scope.addCart = (id, qty) => {
        // console.log(id, qty);
        if(qty && id) {
            storeSrvc.addCart(qty,id).then((response)=>{

            })
        }
    }
    $scope.qty = "0.00";

    $scope.cTc = true;
    $scope.ContinueToCart = () => {
        $scope.cTc = !$scope.cTc;
    }
})