module.exports = {
    getusers: (req,res,next) => {
        const db = req.app.get('db');
        db.get_user_info().then((response) => res.status('200').send(response)).catch(() => res.status('500').send());
    },
    userupdate: (req,res,next) => {
        const db = req.app.get('db');
        const {authid, avatar, level, assigned_kpis} = req.body
        db.update_user_info([authid, avatar, level, assigned_kpis]).then((response) => res.status('200').send('ok')).catch(() =>res.status('500').send())
    }
}