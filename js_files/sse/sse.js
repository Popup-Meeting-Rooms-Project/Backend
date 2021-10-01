const clients = [];
const data = [];

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
            topic: "topic",
            response
        };
        

        clients.push(newClient);

        console.log(`Client ${clientId} : connection opened`);
        sendData(newClient);

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

        update(data, message);

        clients.forEach(client => sendData(client));
    }
}  


const update = function(data, message){

    console.log("SSE : updating event")

    /*
    let msg = JSON.parse(message);
    
    for (const d in data) {
        let entry = JSON.parse(data[d]);
        
        if (entry["id"] === msg["id"]) {            
            entry["occupancy"] = msg["occupancy"];
            entry["timestamp"] = msg["timestamp"];
            return;     
        }
    }

    

    */

    data.push(message);
}

const sendData = function(client){

console.log("SSE : data sent : " + data)

//client.response.write(`data: ${JSON.stringify(data)}\n\n`); 

client.response.write("" + data);

}

module.exports = { sseRegistration, sseEvents}
