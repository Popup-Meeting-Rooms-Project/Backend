const express = require('express');
const app = express();

const clients = [];
const sse = require('./sse')(clients);  

const config = require('./config');


app.get('/register', sse.register);
app.get('/update/:fact', sse.addMeasure); //for testing


app.listen(config.port, () => {
    console.log('API listening on port ' + config.port + ' localHost')
}) 
