angular.module('myPMM').controller('storeCtrl', function($scope, storeSrvc, cartSrvc) {
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
        cartSrvc.getCart(user_id).then((response)=>{
            let isItemInDatabase = false;
            let currentQty = 0;
            response.map((x)=> x.item_id === id ? isItemInDatabase = true : 0)
            response.map((x)=> x.item_id === id ? currentQty=x.quantity : 0)
            // console.log(isItemInDatabase);
            if(qty>0 && id && user_id && isItemInDatabase === false) {
                // console.log(id, qty, user_id)
                storeSrvc.addCart(qty,id, user_id).then((response)=>{
                    // console.log(response); //no response right now;
                })
            }
            if(qty>0 && id && user_id && isItemInDatabase === true) {
                // console.log(id, qty, user_id)
                qty = parseInt(currentQty) + parseInt(qty);
                storeSrvc.updateCartQty(id, qty).then((response)=>{
                    // console.log(response); //no response right now;
                })
            }
        })  
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