angular.module('myPMM').controller('kpiCtrl', function($scope,homeSrvc) {
    $scope.user_infos =  homeSrvc.getUser().then((response) => {
        let parseArray = response[0].assigned_kpis.split(" ").map((x) => {return parseInt(x)})
        $scope.user_info = parseArray;
    
    })
//     $scope.addKPIData = (data, correctiveAction) => {
//         if(!isNaN(data)) {
//             kpiSrvc.addKPIData(1, new Date(), data, correctiveAction).then((response) => {
//                 $scope.data[0] = response[2];
//                 $scope.labels = response[1];
//                 $scope.dataID = response[0];
//             })
//         }
//     }
//     //Convert to directive for individual scoping!


//     //Items to pull from database upon entering from administration panel   
//     $scope.kpiTitle = "Kitkats";
//     $scope.kpiLowerLimit = 20;
//     $scope.kpiUpperLimit = 40;
//     $scope.chartLowerLimit = 0;
//     $scope.chartUpperLimit = 100;
//     //Push new Date(); into the database and reformat after the data has been pulled so you can keep track.
//     $scope.yDate = new Date();

//     $scope.changeDataPoint = (newDataPoint) => {
//         $scope.data[0][$scope.dataPointIndex] = newDataPoint;
//         $scope.dataPointID = $scope.dataID[$scope.dataPointIndex];
//         //console.log($scope.dataPointID);
//         kpiSrvc.updateKPIData($scope.dataPointID, newDataPoint);
//     }
//     $scope.deleteDataPoint = (dataPoint) => {
//         $scope.data[0].splice([$scope.dataPointIndex],1)
//         $scope.dataPointID = $scope.dataID[$scope.dataPointIndex];
//         //After splicing it messes up if you delete between two points.
//         //Use a get command in place after delete and remove splice to fix.
//         kpiSrvc.deleteKPIData($scope.dataPointID)
//     }

//     $scope.editLastDataPoint = lastNewDataPoint => {
//         $scope.data[0][$scope.data[0].length-1] = lastNewDataPoint;
//         kpiSrvc.updateKPIData($scope.dataID[$scope.data[0].length-1], lastNewDataPoint);
//         }
//     $scope.correctiveActions = [];
//     //Labels = X axis;
//     $scope.labels = [];
//     //Legend series names
//     $scope.series = ['Data', 'Lower Limit', 'Upper Limit'];
//     //Data being displayed series 1, series 2, series 3, based on each array.
//     $scope.data = [
//         [],
//         [],
//         []
//     ];
//     $scope.colors = [
//             {
//               backgroundColor: 'blue',
//               borderColor: 'black',
//             },
//             {
//               backgroundColor: 'green',
//               borderColor: 'green',
//               pointRadius: 0
//             },
//             {
//               backgroundColor: 'red',
//               borderColor: 'red',
//               pointRadius: 0
//             }
//           ];
//   $scope.onClick = function (points, evt) {
//     //This gets the index of the value on the line graph, clicked.
//     $scope.dataPointIndex = points[0]._index;
//     //console.log($scope.dataPointIndex);
//     //gets the date
//     //console.log(points[0]._chart.config.data.labels[points[0]._index])
//   };
//   $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
//   $scope.options = {
//     scales: {
//         yAxes: [
//         {
//             id: 'y-axis-1',
//             type: 'linear',
//             display: true,
//             position: 'left',
//             ticks: { 
//               min: $scope.chartLowerLimit, 
//               max: $scope.chartUpperLimit , 
//             } 
//         }
//       ]
//     },
//     title: {
//             display: true,
//             text: $scope.kpiTitle
//         },
//     elements: {
//         line: {
//                 fill: false
//         }
//     },
//     legend: { 
//         display: true 
//     }
//   };   
})