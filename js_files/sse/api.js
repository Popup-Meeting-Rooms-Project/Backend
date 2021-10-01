const { apiConfig } = require('../config');
const express = require('express');
const { sseRegistration: sse } = require('./sse'); 

const app = express();

app.get('/register', sse.register);

app.listen(apiConfig.port, () => {
    console.log('API listening on port ' + apiConfig.port + ' localHost')
}) 




