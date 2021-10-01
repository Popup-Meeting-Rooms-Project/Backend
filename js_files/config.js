const credentials = require('dotenv').config()

const apiConfig = {

    port: 8080

}



const mqttClientConfig = {

    url : "mqtt://test.mosquitto.org",
    port : 8081,
    options : {},
    topic : "/michel"
}

const dbConfig = {
    host: credentials.DB_CONFIG, 
    port:  3306,
    user:credentials.DB_USER, 
    password: credentials.DB_PASS,
    database: credentials.DB_NAME,
    connectionLimit: 5
}


module.exports = {apiConfig, mqttClientConfig, dbConfig}

