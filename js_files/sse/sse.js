const { mqttClientConfig } = require('../config')
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

        console.log(`Client ${clientId} : connection opened`);

        request.on('close', () => {

            (function() {
                for (let i = 0; i < clients.length; i++) {
                    if(clients[i].id === clientId){
                        clients.splice(i, 1);
                        return;
                    }
                }
            })()

            console.log(`Client ${clientId} : connection closed`);

        });

    }
}

const sseEvents = {

    newEvent : function(message){

        let sensorId = JSON.parse(message).id;

        const roomInfo = db.getRoomInfo(sensorId);
        
        const data = {
            building_floor: roomInfo.building_floor,
            room_number: roomInfo.room_number,
            room_availability: message.room_availability,
            timeStamp: message.timeStamp
        }


        console.log("SSE sending : " + data.toString());

        clients.forEach(client => sendData(data, client));
        
    }
}  


const sendData = function(data, client){

client.response.write(data);

}

module.exports = { sseRegistration, sseEvents}
