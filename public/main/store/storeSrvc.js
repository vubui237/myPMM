angular.module('myPMM').service('storeSrvc', function($http) {
    this.getStoreItems = () => {
        return $http({
            method: "GET",
            url: "/store"
        }).then((response)=> {
            return response.data;
        })
    }
    this.addStoreItem = (name, description, image, sizes, prices) => {
        return $http({
            method: "POST",
            url: "/store",
            data: {"name" : name, "description" : description, "image" : image, "sizes" : sizes, "prices" : prices}
        }).then((response)=> {
            return response.data;
        })
    }
    this.updateStoreItem = (id, name, description, image, sizes, prices) => {
        return $http({
            method: "PUT",
            url: "/store",
            data: {"id" : id, "name" : name, "description" : description, "image" : image, "sizes" : sizes, "prices" : prices}
        }).then((response)=> {
            return response.data;
        })
    }
    this.deleteStoreItem = (id) => {
        return $http({
            method: "PUT",
            url: "/store/" + id
        }).then((response)=> {
            return response.data;
        })
    }
    this.getCart = (user_id) => {
        return $http({
            method: "GET",
            url: "/cart/" + user_id,
        })
    }
    this.addCart = (id, qty) => {
        return $http({
            method: "POST",
            url: "/cart",
            data: {"id_id" : id, "qty" : qty}
        }).then((response)=> {
            return response.data;
        })
    }
    this.deleteCartItem = (cart_id) => {
        return $http({
            method: "DELETE",
            url: "/cart/" + cart_id,
        }).then((response)=> {
            return response.data;
        })
    }
    this.updateCartQty = (cart_id, qty) => {
        return $http({
            method: "PUT",
            url: "/cart",
            data: {"id" : cart_id, "quantity" : qty}
        })
    }

})