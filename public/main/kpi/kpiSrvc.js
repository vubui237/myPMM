angular.module('myPMM').service('kpiSrvc', function($http) {
    // this.getKPIData = (kpi_id) => {
    //     return $http({
    //         method: "GET",
    //         url: "http://localhost:3000/kpidata/" + kpi_id,
    //     }).then((response) => {
    //         let arr = [[],[],[]];
    //         for(let i = 0; i<response.data.length; i++) {
    //             arr[0].push(response.data[i].id);
    //             arr[1].push(response.data[i].date1);
    //             arr[2].push(response.data[i].data);
    //         }
    //         return arr;
    //     })
    // }

    this.addKPIData = (kpi_id, date, data) => {
        return $http({
            method: "POST",
            url: "http://localhost:3000/kpidata",
            data: {"kpi_id" : kpi_id, "date1" : date, "data" : data}
        }).then((response) => {
            let arr = [[],[],[]];
            for(let i = 0; i<response.data.length; i++) {
                arr[0].push(response.data[i].id);
                arr[1].push(response.data[i].date1);
                arr[2].push(response.data[i].data);
            }
            return arr;
        })
    }

    this.updateKPIData = (dataPointID, newDataPoint) => {
        return $http({
            method: "PUT",
            url: "http://localhost:3000/kpidata/" + dataPointID + "?data=" + newDataPoint,

        })
    }
})


