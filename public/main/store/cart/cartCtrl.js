angular.module('myPMM').controller('cartCtrl', function($scope, cartSrvc, storeSrvc) {
    let user_id = $scope.test2[0].authid;
    getCartByUser = () => {
        cartSrvc.getCart(user_id).then((response) => {
            $scope.shoppingCart = response.sort((a,b)=> {return a.id-b.id});
            // console.log(response);
            $scope.totals = 0;
            $scope.shoppingCart.map((x)=>{$scope.totals+=x.quantity * x.prices})
            if($scope.couponDiscount === true) {
                $scope.totals = $scope.totals * (1-$scope.couponDiscountValue)
            }

        })
    }
    getCartByUser();
    $scope.updateQtyCart = (id, quantity) => {
        if(quantity>0) {
            storeSrvc.updateCartQty(id, quantity).then(()=> {
                getCartByUser();
            })
        }
        if(quantity<=0) {
            $scope.deleteFromCart(id).then(()=> {
                getCartByUser();
            })
        }
    }
    $scope.deleteFromCart = (id) => {
        cartSrvc.deleteFromCart(id).then((response)=> {
            getCartByUser();
        })
    }
    $scope.couponDiscount = false;
    $scope.couponDiscountValue = 0.1;
    $scope.applyCoupon = (coupon) => {
        console.log(coupon);
            if(coupon === "JBS") {
                $scope.couponDiscount = true;
                getCartByUser();
            }
            else {
                $scope.couponDiscount = false;
            }
    }  

})