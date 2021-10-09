const credentials = require('dotenv').config()
const winston = require('winston');

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3
};
  
const logger = winston.createLogger({
    levels: logLevels,
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logs/process.log' })
    ]
});


const apiConfig = {

    port: 8080

}

/*
    url : "mqtt://128.214.253.119",
    port : 8888,
    
*/


const mqttClientConfig = {

    url : "mqtt://test.mosquitto.org",
    port : 1883,
    options : {},
    topic : "hh-iot-mqtt/outTopic"
}

const dbConfig = {
    host: credentials.DB_CONFIG, 
    port:  3306,
    user:credentials.DB_USER, 
    password: credentials.DB_PASS,
    database: credentials.DB_NAME,
    connectionLimit: 5
}


module.exports = {apiConfig, mqttClientConfig, dbConfig, logger}

