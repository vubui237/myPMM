angular.module('myPMM').controller('homeCtrl', function($scope, homeSrvc) {
    //Was originally testing with ng-click instead of refreshes, turn this back into = instead of function later.
    $scope.test = () => {
        homeSrvc.getUser().then((response) => {
        $scope.test2 = response;
        $scope.userID = $scope.test2[0].authid;
        // console.log($scope.test2);
        if($scope.test2[0].level > 0 && $scope.test2[0].level!==2) {
            $scope.level = true;
            $scope.levelActivation = false;
            $scope.admin = false;
        }
        if($scope.test2[0].level > 1) {
            $scope.level = true;
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
    //Was originally testing with ng-click instead of refreshes, turn this back into = instead of function later.
    $scope.activateChat = () => {
        homeSrvc.getChat().then((messages)=> {
            $scope.chatData = messages;
            // console.log($scope.chatData);
            sortChats();
        })
    }
    $scope.activateChat();

    $scope.sendChat = (msg, image) => {
        let timeago = new Date();
        let imgTag = msg.split("").splice(0,5).join("")+msg.split("").splice(msg.length-6, 6).join("");
        let img = null;
        //Adding image BBCodes like forums.
        // if(imgTag === '[img][/img]') {
        //     img = msg.slice(5,msg.length-6);
        //     msg = null;
        // }

        //This is here to prevent previous BB code from breaking, if reversal is needed from text->image buttons.
        if(msg === 'null') {
            msg = null;
        }
        if(image === 'null') {
            image = null;
        }
        if(image) {
            img = image;
            console.log(img);
        }
        //IMPLEMENTING EMOJIS ZOMGZ
        //convert to switch statement later.
        if(msg === ":cool:") {
            img = './asset/img/emojis/cool.png'
            msg = null;
        }
        if(msg === ":lol:") {
            img = './asset/img/emojis/lol.png'
            msg = null;
        }
        if(msg === ":angry:") {
            img = './asset/img/emojis/angry.png'
            msg = null;
        }
        if(msg === ":crying:") {
            img = './asset/img/emojis/crying.png'
            msg = null;
        }
        if(msg === ":devmtn:") {
            img = './asset/img/emojis/devmtn.png'
            msg = null;
        }
        if(msg === ":love:") {
            img = './asset/img/emojis/love.png'
            msg = null;
        }
        if(msg === ":omg:") {
            img = './asset/img/emojis/omg.png'
            msg = null;
        }
        if(msg === ":orly:") {
            img = './asset/img/emojis/orly.png'
            msg = null;
        }
        if(msg!== "") {
            homeSrvc.postChat($scope.userID, msg, timeago, img).then((messages)=> {
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
    $scope.TxtImg = true;
    $scope.toggleTxtImg = () => {
        $scope.TxtImg = !$scope.TxtImg;
        console.log("its working")
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
    $scope.sadMoji = false;
    $scope.openCloseEmoji = () => {
        $scope.sadMoji = !$scope.sadMoji;
    }



})