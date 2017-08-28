angular.module('myPMM').service('kpiSrvc', function($http) {
    this.getKPIData = (kpi_id) => {
        return $http({
            method: "GET",
            url: "http://localhost:3000/kpidata/" + kpi_id,
        }).then((response) => {
            //When data is modified, it goes to end of array, have to resort for data updates (PUT);
            let sortarr = [];
            let arr = [[],[],[]];

            //Adding object to array to begin sorting.
            for(let i = 0; i<response.data.length; i++) {
                sortarr.push([response.data[i].id, response.data[i].date1, response.data[i].data]);
            }

            //Sort function
            sortarr.sort((a,b) => {return a[0] - b[0]})

            //Pushing sorted items into usable array in controller.
            for(let j = 0; j<sortarr.length; j++) {
                arr[0].push(sortarr[j][0])
                arr[1].push(sortarr[j][1])
                arr[2].push(sortarr[j][2])
            }
            return arr;
        })
    }
    //Adding items to the database;
    this.addKPIData = (kpi_id, date, data, correctiveAction) => {
        return $http({
            method: "POST",
            url: "http://localhost:3000/kpidata",
            data: {"kpi_id" : kpi_id, "date1" : date, "data" : data, "corrective_action": correctiveAction}})
            .then((response) => {
            //When data is modified, it goes to end of array, have to resort for data updates (PUT);
            let sortarr = [];
            let arr = [[],[],[]];

            //Adding object to array to begin sorting.
            for(let i = 0; i<response.data.length; i++) {
                sortarr.push([response.data[i].id, response.data[i].date1, response.data[i].data]);
            }

            //Sort function
            sortarr.sort((a,b) => {return a[0] - b[0]})

            //Pushing sorted items into usable array in controller.
            for(let j = 0; j<sortarr.length; j++) {
                arr[0].push(sortarr[j][0])
                arr[1].push(sortarr[j][1])
                arr[2].push(sortarr[j][2])
            }
            return arr;
        })
    }

    //Updating KPI data based on selected input
    this.updateKPIData = (dataPointID, newDataPoint) => {
        return $http({
            method: "PUT",
            url: "http://localhost:3000/kpidata/" + dataPointID + "?data=" + newDataPoint,

        })
    }

    this.deleteKPIData = (dataPointID) => {
        return $http({
            method: "DELETE",
            url: "http://localhost:3000/kpidata/" + dataPointID, 
        })
    }

    this.getInfoKPI = (name) => {
        return $http({
            method: "GET",
            url: "http://localhost:3000/kpiinfo/" + name,
        }).then((response) => {
            return response.data[0];
        })
    }
})


