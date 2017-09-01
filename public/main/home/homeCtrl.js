angular.module('myPMM').controller('homeCtrl', function($scope, homeSrvc) {

    $scope.test = () => {
        homeSrvc.getUser().then((response) => {
        $scope.test2 = response;
        $scope.userID = $scope.test2[0].authid;
        console.log($scope.test2);
        if($scope.test2[0].level > 0) {
            $scope.level = true;
            $scope.levelActivation = false;
        }
        if($scope.test2[0].level > 1) {
            $scope.admin = true;
        }
        if($scope.test2[0].level === 0) {
            // console.log("yo level too low noob")
            // console.log($scope.test2)
            $scope.level = false;
            $scope.levelActivation = true;
        }
        })
    }
    $scope.test();
    $scope.activateChat = () => {
        homeSrvc.getChat().then((messages)=> {
            $scope.chatData = messages;
            // console.log($scope.chatData);
            sortChats();
        })
    }
    $scope.activateChat();

    $scope.sendChat = (msg) => {
        if(msg) {
            let timeago = new Date();
            // console.log(msg);
            homeSrvc.postChat($scope.userID, msg, timeago).then((messages)=> {
                $scope.chatData = messages;
                console.log($scope.chatData);
                sortChats();
            })
        }
    }
    sortChats = () => {
        for(let i = 0; i<$scope.chatData.length; i++) {
            $scope.chatData[i].timeago = convertTime(new Date($scope.chatData[i].timeago));
        }
        $scope.chatData.sort((a,b)=>{return b.id-a.id})
    }
    convertTime = (date) => {
        let seconds = Math.floor((new Date() - date) / 1000);
        if(Math.round(seconds/(60*60*24*365.25)) >= 2) return Math.round(seconds/(60*60*24*365.25)) + " years ago";
        else if(Math.round(seconds/(60*60*24*365.25)) >= 1) return "1 year ago";
        else if(Math.round(seconds/(60*60*24*30.4)) >= 2) return Math.round(seconds/(60*60*24*30.4)) + " months ago";
        else if(Math.round(seconds/(60*60*24*30.4)) >= 1) return "1 month ago";
        else if(Math.round(seconds/(60*60*24*7)) >= 2) return Math.round(seconds/(60*60*24*7)) + " weeks ago";
        else if(Math.round(seconds/(60*60*24*7)) >= 1) return "1 week ago";
        else if(Math.round(seconds/(60*60*24)) >= 2) return Math.round(seconds/(60*60*24)) + " days ago";
        else if(Math.round(seconds/(60*60*24)) >= 1) return "1 day ago";
        else if(Math.round(seconds/(60*60)) >= 2) return Math.round(seconds/(60*60)) + " hours ago";
        else if(Math.round(seconds/(60*60)) >= 1) return "1 hour ago";
        else if(Math.round(seconds/60) >= 2) return Math.round(seconds/60) + " minutes ago";
        else if(Math.round(seconds/60) >= 1) return "1 minute ago";
        else if(seconds >= 2)return seconds + " seconds ago";
        else return "1 second ago";
    }



})