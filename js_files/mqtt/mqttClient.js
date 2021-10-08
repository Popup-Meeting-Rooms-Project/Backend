const { sseEvents: sse } = require('../sse/sse'); 
const { dbWrite: db } = require('../db/dal');
const { mqttClientConfig } = require('../config');

const  mqtt = require('mqtt'); 


const mqttClient = mqtt.connect(
    mqttClientConfig.url,
    mqttClientConfig.port,
    mqttClientConfig.options
    )

 
mqttClient.on("connect", function(){	

    console.log("Connected to Broker at URL " + mqttClientConfig.url);

    const msg = {
        id: "TE-ST-NB-01",
        availability: true
    }

    mqttClient.publish(mqttClientConfig.topic, JSON.stringify(msg), {})

})

mqttClient.on("error", function(error){ 
    console.log("Broker error : " + error);
    process.exit(1);
})


mqttClient.subscribe(mqttClientConfig.topic);


mqttClient.on('message', function(topic, message, packet){

    console.log("Message received " + message)

    sse.newEvent(message);

    db.insert(message);

});




