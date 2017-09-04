angular.module('myPMM').directive('test', function () {
    return {
      restrict: 'E',
        scope: {
          name: '='
        },
        templateUrl: '../../main/kpi/kpidir.html',
        controller: function($scope, kpiSrvc) {
            $scope.pushKPIData = (graphID, time, data, correctiveAction) => {
                kpiSrvc.addKPIData(graphID, time, data, correctiveAction).then((response) => {
                    $scope.data[0] = response[2];
                    $scope.labels = response[1].map((x)=>{
                        let z = new Date(x)
                        return z.toLocaleTimeString();})
                    $scope.dataID = response[0];
                    })
            }
            $scope.getInfoKPI = (name) => {
                return kpiSrvc.getInfoKPI(name)
            }
            $scope.getStartKPI = (name) => {
                return kpiSrvc.getKPIData(name);
            }
            $scope.changeKPIPoint = (dataPointID, newDataPoint) => {
                kpiSrvc.updateKPIData(dataPointID, newDataPoint);
            }
            $scope.deleteKPIPoint = (dataPointID) => {
                kpiSrvc.deleteKPIData(dataPointID)
            }
            $scope.updateLastKPIPoint = (dataID, lastNewPoint) => {
                kpiSrvc.updateKPIData(dataID, lastNewPoint);
            }
            
        },
        link: function(scope, elements, attributes) {
            scope.getKPIInfo = scope.getInfoKPI(scope.name).then((rs) => {
                scope.kpiTitle = rs.title;
                scope.kpiLowerLimit = rs.kpi_lower_limit;
                scope.kpiUpperLimit = rs.kpi_upper_limit;
                scope.chartLowerLimit = rs.chart_lower_limit;
                scope.chartUpperLimit = rs.chart_upper_limit;

                scope.options = {
                    scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left',
                            ticks: { 
                            min: scope.chartLowerLimit, 
                            max: scope.chartUpperLimit, 
                            } 
                        }
                    ]
                },
                title: {
                        display: false,
                        text: scope.kpiTitle
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
            });
            scope.getInitialKPI = scope.getStartKPI(scope.name).then((rs) => {
                scope.correctiveActions = [];
                //Labels = X axis;
                scope.labels = [];
                //Legend series names
                scope.series = ['Data', 'Lower Limit', 'Upper Limit'];
                //Data being displayed series 1, series 2, series 3, based on each array.
                scope.data = [
                    [],
                    [],
                    []
                ];  
                for(let i = 0; i<rs[2].length; i++) {
                    scope.data[1].push(scope.kpiLowerLimit)
                    scope.data[2].push(scope.kpiUpperLimit)
                }
                scope.data[0] = rs[2];
                scope.labels = rs[1].map((x)=>{
                    let z = new Date(x)
                    return z.toLocaleTimeString();

                })
                // console.log(scope.labels);
                scope.dataID = rs[0];
                
            })
    
            scope.addKPIData = (data, correctiveAction) => {
                //console.log(data);
                if(!isNaN(data)) {
                    scope.pushKPIData(scope.name, new Date(), data, correctiveAction);
                    scope.data[1].push(scope.kpiLowerLimit)
                    scope.data[2].push(scope.kpiUpperLimit)
                }
            }
            //Push new Date(); into the database and reformat after the data has been pulled so you can keep track.
            scope.yDate = new Date();

            scope.changeDataPoint = (newDataPoint) => {
                if(!isNaN(newDataPoint)) {
                    scope.data[0][scope.dataPointIndex] = newDataPoint;
                    scope.dataPointID = scope.dataID[scope.dataPointIndex];
                    //console.log(scope.dataPointID);
                    scope.changeKPIPoint(scope.dataPointID, newDataPoint);
                    
                }
            }
            scope.deleteDataPoint = (dataPoint) => {
                scope.data[0].splice([scope.dataPointIndex],1)
                scope.data[1].splice([scope.dataPointIndex],1)
                scope.data[2].splice([scope.dataPointIndex],1)
                scope.labels.splice([scope.dataPointIndex],1)
                scope.dataPointID = scope.dataID[scope.dataPointIndex];
                //After splicing it messes up if you delete between two points.
                //Use a get command in place after delete and remove splice to fix.
                scope.deleteKPIPoint(scope.dataPointID);
            }
            scope.editLastDataPoint = lastNewDataPoint => {
                scope.data[0][scope.data[0].length-1] = lastNewDataPoint;
                scope.updateLastKPIPoint(scope.dataID[scope.data[0].length-1], lastNewDataPoint);
            }
            scope.colors = [
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
            scope.onClick = function (points, evt) {
                //This gets the index of the value on the line graph, clicked.
                scope.dataPointIndex = points[0]._index;
                //console.log(scope.dataPointIndex);
                //gets the date
                //console.log(points[0]._chart.config.data.labels[points[0]._index])
            };
            scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
            scope.chartOnOff = false;
            scope.showHide = () => {
                scope.chartOnOff = !scope.chartOnOff
            }
        }
    };
});