angular.module('myPMM').controller('cartCtrl', function($scope, cartSrvc) {
    let user_id = $scope.test2[0].authid;
    cartSrvc.getCart(user_id).then((response) => {
        $scope.shoppingCart = response;
        console.log(response);
    })

})