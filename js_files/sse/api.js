const { api_config } = require('../config');
const express = require('express');
const { sse_registration } = require('./sse'); 

const app = express();


app.get('/register', sse_registration.register);


app.listen(api_config.port, () => {
    console.log('API listening on port ' + api_config.port + ' localHost')
}) 




