angular.module('myPMM').service('homeSrvc', function($http) {
    this.getUser = () => { 
        return $http({
            method: "GET",
            url: "/auth/me"
        }).then((response) => {
            return response.data;
        })
    }
    this.getChat = () => {
        return $http({
            method: "GET",
            url: "/chat"
        }).then((response)=> {
            return response.data;
        })
    }
    this.postChat = (user_chat_id, user_message, time_ago) => {
        return $http({
            method: "POST",
            url: "/chat",
            data: {"message" : user_message , "timeago" : time_ago , "id" : user_chat_id}
        }).then((response)=> {
            return response.data;
        })
    }
})