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

    console.log("Connected to Broker");
    
    console.log("Sending test message");

    msg1 = {
        "id": "CA:F7:44:DE:EB:E1",
        "room_number": 4,
        "occupancy": true,
        "timestamp": "2017-07-01T18:36:57.229115"
      }

    msg2 = {
    "id": "CB:F8:45:DF:EC:E2",
    "room_number": 5,
    "occupancy": true,
    "timestamp": "2017-07-01T18:36:57.229115"
    }

    msg3 = {
        "id": "CA:F7:44:DE:EB:E1",
        "room_number": 4,
        "occupancy": false,
        "timestamp": "2017-07-01T18:36:57.229115"
      }

    mqttClient.publish(mqttClientConfig.topic, `${JSON.stringify(msg1)}`)
    mqttClient.publish(mqttClientConfig.topic, `${JSON.stringify(msg2)}`)
    mqttClient.publish(mqttClientConfig.topic, `${JSON.stringify(msg3)}`)

})

mqttClient.on("error", function(error){ 
    console.log("Broker error : " + error);
    process.exit(1);
})


mqttClient.subscribe(mqttClientConfig.topic);


mqttClient.on('message', function(topic, message, packet){

    sse.newEvent(message);

    db.insert(message);

});




