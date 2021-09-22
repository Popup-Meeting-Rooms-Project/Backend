
const express = require('express');
const app = express();

module.exports = function(repository) {  
    
    app.get('/status', (req, res) => {

        clients = repository.getAll();
        res.json({clients: clients.length})
    })

    app.get('/register', (req, res) => {

        const headers = {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        };

        res.writeHead(200, headers);
        
        const clientId = Date.now();
        
        const newClient = {
            id: clientId,
            res
        };
        
        repository.add(newClient);
        
        req.on('close', () => {
            console.log(`${clientId} Connection closed`);
            
            repository.remove(clientId)
        });
        
    
    })
    
    app.listen(8181, () => {
        console.log("API listening on port 8181 localHost")
    }) 
}


/*
    MICHEL DORSAZ

    Is client ID secure enough ? 
    -> maybe should use another thing than Date.now()

    Used sources (modified):
    //https://www.digitalocean.com/community/tutorials/nodejs-server-sent-events-build-realtime-app
*/







