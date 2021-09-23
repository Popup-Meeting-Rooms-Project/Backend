const express = require('express');
const app = express();

const sse = require('./sse'); 

const mqttCallback = {
    onMessage : function(data){

        sse.updateAll(data);
    }
}

const mqtt = require('./mqtt')(mqttCallback);  
const config = require('./config');



app.get('/register', sse.register);
app.get('/update/:id', mqtt.addMeasure); //for testing


app.listen(config.port, () => {
    console.log('API listening on port ' + config.port + ' localHost')
}) 
