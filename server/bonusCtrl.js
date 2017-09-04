module.exports = {
    getBonus: (req,res,next) => {
        console.log(req.params);
        const db = req.app.get('db');
        const{id} = req.params;
        db.get_bonus([id]).then((response)=>res.status("200").send(response)).catch(()=>res.status('404').send());

    },
    addBonus: (req,res,next) => {
        const db = req.app.get('db');
        const{authid, name, goal, current} = req.body;
        db.add_bonus([authid, name, goal, current]).then(()=>res.status("200").send()).catch(()=>res.status('404').send());
        
    },
    updateBonus: (req,res,next) => {
        const db = req.app.get('db');
        const{bonusid, name, goal, current} = req.body;
        db.update_bonus([bonusid, name, goal, current]).then(()=>res.status("200").send()).catch(()=>res.status('404').send());
        
    },
    deleteBonus: (req,res,next) => {
        const db = req.app.get('db');
        const{id} = req.params;
        db.update_bonus([id]).then(()=>res.status("200").send()).catch(()=>res.status('404').send());
        
    }
}