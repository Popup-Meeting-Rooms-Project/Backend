const clients = [];

module.exports = {  

    sse_registration : {

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
    },

    sse_events : {

        sendEvent : function(message, topic){

            /* IF MANY TOPIC REGISTRATION POSSIBLE :

            let interested_clients = clients.filter(client => client.topic = topic);

            interested_clients.forEach(client => update(client, message));
            */

            clients.forEach(client => update(client, message));

            console.log("SSE : sent " + message + " to " + topic)
        }
    }  
}

const update = function(client, message){
    
    //client.response.write(`data: ${JSON.stringify(message)}\n\n`); 

    client.response.write(message);
}
