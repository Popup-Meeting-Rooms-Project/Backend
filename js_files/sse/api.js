const { apiConfig, logger } = require('../config');
const express = require('express');
const { sseRegistration: sse } = require('./sse');

const app = express();

app.get('/register', sse.register);
app.get('/getAllRooms', sse.getAllRooms);

app.listen(apiConfig.port, () => {
    console.log('sse/api Listening on port ' + apiConfig.port);
    logger.info('sse/api Listening on port ' + apiConfig.port);
}) 





