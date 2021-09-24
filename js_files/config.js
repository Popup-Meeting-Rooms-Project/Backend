const apiConfig = {

    port: 8080

}

const mqttClientConfig = {

    url : "mqtt://test.mosquitto.org",
    port : 8081,
    options : {
        clientId:"mqttjs01",
        username:"steve",
        password:"password",
        clean:true
    },
    topic : "/softala/test"
}


module.exports = {apiConfig, mqttClientConfig}

