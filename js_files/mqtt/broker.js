const { sse_events } = require('../sse/sse'); 
const { db_write } = require('../db/dal');
const { broker_config } = require('../config');

const  mqtt = require('mqtt'); 

const client = mqtt.connect(
    broker_config.url,
    broker_config.port,
    broker_config.options)

client.on("connect", function(){	
    console.log("Connected to Broker");
    
    console.log("Sending test message");

    client.publish("/softala/test", "test message")
})

client.on("error", function(error){ 
    console.log("Broker error : " + error);
    process.exit(1);
})


client.subscribe(broker_config.topic);


client.on('message', function(topic, message, packet){

    
    db_write.insert(topic, message);

    sse_events.sendEvent(message, topic)

});




