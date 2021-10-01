const apiConfig = {

    port: 8080

}



/*
    url : "mqtt://128.214.253.119",
    port : 8880,


    url : "mqtt://test.mosquitto.org",
    port : 8081,
 
*/

const mqttClientConfig = {

    url : "mqtt://test.mosquitto.org",
    port : 8081,
    /*
    options : {   
        clientId:"mqttjs01",
        username:"steve",
        password:"password",
        clean:true
    },
    */
   options : {},

    topic : "michel"
}

const dbConfig = {
    host: '206.189.16.14', 
    port:  3306,
    user:'michel', 
    password: 'EeRuyi3f',
    database: 'eficode',
    connectionLimit: 5
}


module.exports = {apiConfig, mqttClientConfig, dbConfig}

