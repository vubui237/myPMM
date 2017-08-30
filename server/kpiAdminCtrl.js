module.exports = {
    add: (req,res,next) => {
        const db = req.app.get('db')
        const{title, kpi_lower_limit, kpi_upper_limit, chart_lower_limit, chart_upper_limit} = req.body;
        db.add_kpi_new([title, kpi_lower_limit, kpi_upper_limit, chart_lower_limit, chart_upper_limit]).then((data)=> res.status('200').send(data)).catch(()=>res.status('500').send());
    },
    getHistory: (req,res,next) => {
        const db = req.app.get('db');
        db.get_kpi_history().then((data)=>res.status('200').send(data)).catch(()=>res.status('200').send());
    },
    getKPIHistoryByID: (req,res,next) => {
        const db = req.app.get('db');
        const {id} = req.params;
        db.get_kpi_history_id([id]).then((data)=>res.status('200').send(data)).catch(()=>res.status('500').send());
    }
}