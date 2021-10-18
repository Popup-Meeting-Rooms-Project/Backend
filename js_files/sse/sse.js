const { mqttClientConfig, logger } = require('../config')
const { dbRead: db } = require('../db/dal');

const clients = [];

const sseRegistration = {

    register : function(request, response){

        const headers = {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        };

        response.writeHead(200, headers);
        

        const clientId = Date.now();

        const newClient = {
            id: clientId,
            topic: mqttClientConfig.topic,
            response
        };
        

        clients.push(newClient);

        console.log('sse/sse Connection with client ' + clientId);
        logger.info('sse/sse Connection with client ' + clientId);

        request.on('close', () => {

            (function() {
                for (let i = 0; i < clients.length; i++) {
                    if(clients[i].id === clientId){
                        clients.splice(i, 1);
                        return;
                    }
                }
            })()

            console.log('sse/sse Disconnection from client ' + clientId);
            logger.info('sse/sse Disconnection from client ' + clientId);

        });

    }
}

const sseEvents = {

    newEvent : function(message){

        let msgJson = JSON.parse(message);
        let sensorId = msgJson["sensor"];

        
        const roomInfo = db.getRoomInfo(sensorId);
        
        const data = {
            building_floor: roomInfo.building_floor,
            room_number: roomInfo.room_number,
            room_availability: msgJson["detected"],
            timeStamp: Date.now()
        }
	console.log(JSON.stringify(data));
        clients.forEach(client => sendData(data, client));
        
    }
}  


const sendData = function(data, client){

client.response.write(JSON.stringify(data));

}

module.exports = { sseRegistration, sseEvents}
