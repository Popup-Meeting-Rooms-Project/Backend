const { sseEvents: sse } = require('../sse/sse'); 
const { dbWrite: db } = require('../db/dal');
const { mqttClientConfig, logger } = require('../config');

const  mqtt = require('mqtt'); 


const mqttClient = mqtt.connect(
    mqttClientConfig.url,
    mqttClientConfig.port,
    mqttClientConfig.options
    )

 
mqttClient.on("connect", function(){	

    console.log("mqtt/mqttClient Connected to Broker at URL " + mqttClientConfig.url);
    logger.info("mqtt/mqttClient Connected to Broker at URL " + mqttClientConfig.url);


    const msg = { 

        "sensor": "24:6F:28:9D:B9:14", 
        
        "detected": false 
        
        } 

    mqttClient.publish(mqttClientConfig.topic, JSON.stringify(msg), {})

})

mqttClient.on("error", function(error){ 
    console.log("mqtt/mqttClient Broker error : " + error);
    logger.fatal("mqtt/mqttClient Broker error : " + error);

    process.exit(1);
})


mqttClient.subscribe(mqttClientConfig.topic);


mqttClient.on('message', function(topic, message, packet){

    sse.newEvent(message);

    db.insert(message);

});




