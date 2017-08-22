const express = require('express');
const {json} = require('body-parser');
const cors = require('cors');
//const session = require('express-session');
const massive = require('massive');
const config = require('./config.js')
const kpiCtrl = require('./kpi_controller.js')
const port = 3000;

const app = express();
app.use(json());
app.use(cors());
//app.use(session());

massive(config.connectionString).then(db => {
    app.set('db', db);
})

app.get('/kpidata/:id', kpiCtrl.get);
app.post('/kpidata', kpiCtrl.add);
app.put('/kpidata/:id', kpiCtrl.update);







app.listen(port, () => { console.log(`Listening on port: ${port}`)});