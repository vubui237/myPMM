angular.module('myPMM').controller('kpiCtrl', function($scope) {
    //Items to pull from database upon entering from administration panel   
    $scope.kpiTitle = "Kitkats";
    $scope.kpiLowerLimit = 20;
    $scope.kpiUpperLimit = 40;
    $scope.chartLowerLimit = 0;
    $scope.chartUpperLimit = 100;
    //Push new Date(); into the database and reformat after the data has been pulled so you can keep track.
    $scope.yDate = new Date();
    $scope.changeDataPoint = (newDataPoint) => {
        $scope.data[0][$scope.dataPointIndex] = newDataPoint;
    }
    $scope.noob = (nums) => {
        $scope.data[0].push(nums);
        $scope.data[1].push($scope.kpiLowerLimit);
        $scope.data[2].push($scope.kpiUpperLimit);
        $scope.labels.push($scope.yDate);
    } 
    $scope.editLastDataPoint = lastNewDataPoint => {
        $scope.data[0][$scope.data[0].length-1] = lastNewDataPoint;
        }
    
    $scope.correctiveAction = [];
    //Labels = X axis;
    $scope.labels = [];
    //Legend series names
    $scope.series = ['Data', 'Lower Limit', 'Upper Limit'];
    //Data being displayed series 1, series 2, series 3, based on each array.
    $scope.data = [
        [],
        [],
        []
    ];
    $scope.colors = [
            {
              backgroundColor: 'blue',
              borderColor: 'black',
            },
            {
              backgroundColor: 'green',
              borderColor: 'green',
              pointRadius: 0
            },
            {
              backgroundColor: 'red',
              borderColor: 'red',
              pointRadius: 0
            }
          ];
  $scope.onClick = function (points, evt) {
    //This gets the index of the value on the line graph, clicked.
    $scope.dataPointIndex = points[0]._index;
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
        id: 'y-axis-1',
        type: 'linear',
        display: true,
        position: 'left',
        ticks: { 
              min: $scope.chartLowerLimit, 
              max: $scope.chartUpperLimit , 
        } 
        }
      ]
    },
    title: {
            display: true,
            text: $scope.kpiTitle
        },
    elements: {
        line: {
                fill: false
        }
    },
    legend: { 
        display: true 
    }
  };
})