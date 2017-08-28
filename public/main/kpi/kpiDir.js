angular.module('myPMM').directive('test', function () {
    return {
      restrict: 'E',
        scope: {
          name: '='
      },
    templateUrl: '../../main/kpi/kpidir.html',
    controller: function($scope) {
        
    
    },
    link: function(scope, elements, attributes) {
        console.log(scope.name);
        scope.name = scope.name + 1;
        scope.hi = (something) => {
            scope.name += something;
        }

    }
    };
});