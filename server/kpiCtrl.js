module.exports = {
    add: (req,res,next) => {
        const db = req.app.get('db');
        const{kpi_id, date1, data, corrective_action} = req.body;
        db.add_kpi_data([kpi_id, date1, data, corrective_action]).then((data)=> res.status('200').send(data)).catch(()=>res.status('500').send());
    },
    get: (req,res,next) => {
        const db = req.app.get('db');
        const{id} = req.params;
        db.get_kpi_data([id]).then(data=>res.status('200').send(data)).catch(()=> res.status('500').send());
    },
    update: (req,res,next) => {
        const db = req.app.get('db');
        const{id} = req.params;
        const{data} = req.query;
        db.update_kpi_data([id, data]).then(()=>res.status('200').send()).catch(()=>res.status('500').send());
    },
    delete: (req,res,next) => {
        const db = req.app.get('db');
        const{id} = req.params;
        db.delete_kpi_data([id]).then(()=>res.status('200').send()).catch(()=>res.status('500').send());
    }
}