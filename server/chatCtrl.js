module.exports = {
    getChat: (req,res,next) => {
        const db = req.app.get('db');
        db.get_chat().then((data)=>res.status('200').send(data)).catch(()=>res.status('404').send());
    },
    postChat: (req,res,next) => {
        const db = req.app.get('db');
        const {message, timeago, id} = req.body;
        db.create_chat_message([message, timeago, id]).then((data)=>res.status('200').send(data)).catch(()=>res.status('404').send());
    }
}