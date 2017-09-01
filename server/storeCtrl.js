module.exports = {
    getStoreItems: (req,res,next) => {
        const db = req.app.get('db')
        db.get_store_items().then((response)=>res.status('200').send(response)).catch(()=>res.status('404').send());
    },
    addStoreItem: (req,res,next) => {
        const db = req.app.get('db')
        const {name, description, image, sizes, prices} = req.body;
        db.add_store_item([name, description, image, sizes, prices]).then((response)=>res.status('200').send(response)).catch(()=>res.status('404').send());
    },
    updateStoreItem: (req,res,next) => {
        const db = req.app.get('db')
        const {id, name, description, image, sizes, prices} = req.body;
        db.update_store_item([id, name, description, image, sizes, prices]).then((response)=>res.status('200').send(response)).catch(()=>res.status('404').send());
    },
    deleteStoreItem: (req,res,next) => {
        const db = req.app.get('db');
        const {id} = req.params;
        db.delete_store_item([id]).then((response)=>res.status('200').send(response)).catch(()=>res.status('404').send())
    }

}