module.exports = {

    api_config : {

        port: 8080
    
    },

    broker_config : {

        url : "mqtt://test.mosquitto.org",
        port : 8081,
        options : {
            clientId:"mqttjs01",
            username:"steve",
            password:"password",
            clean:true
        },
        topic : "/softala/test"
    
    },
}



