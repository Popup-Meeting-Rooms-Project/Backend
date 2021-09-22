const data = [];

module.exports = function(clients){  

    return {

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
                response
            };
            
            clients.push(newClient);

            console.log(`${clientId} Connection opened`);
            newClient.response.write(`data: ${JSON.stringify(data)}\n\n`)


            request.on('close', () => {

                (function() {
                    for (let i = 0; i < clients.length; i++) {
                        if(clients[i].id === clientId){
                            clients.splice(i, 1);
                            return;
                        }
                    }
                })()

                console.log(`${clientId} Connection closed`);

            });

        },

        addMeasure : function(request, response){

            measure = request.params.fact;

            data.push(measure);

            
            updateAll(clients);
        
        }
    }
}


const updateAll = function(clients){

    clients.forEach(client => client.response.write(`data: ${JSON.stringify(data)}\n\n`))

}

/*
    COMMENTS :

    Is client ID secure enough ? 
    -> maybe should use another thing than Date.now()

*/