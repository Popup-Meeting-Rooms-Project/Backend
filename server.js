const express = require('express');
const app = express();

let clientList = [];
const facts = [];

const clientRepository = {

    getAll : function(){
        return clientList;
    },
    add : function(client) {
        clientList.push(client);

        //Send latest facts to new client
        client.res.write(`data: ${JSON.stringify(facts)}\n\n`)
    },

    remove : function(clientId){
        clientList = clientList.filter(client => client.id !== clientId);
    }
}


API = require('./restApi')(clientRepository);


const updateAll = function(fact){
    facts.push(fact);
    clientList.forEach(client => client.res.write(`data: ${JSON.stringify(facts)}\n\n`))
}


app.get('/update/:fact', (req, res) => {

    data = req.params.fact;

    updateAll(data);
})

app.listen(8080, function () {
  console.log('Server is listening on port 8080')
});

/*
    MICHEL DORSAZ

    How will Broker send information ? 
        using the server port ?
        using a SSE connection ?
        using directly the API ?

    Used sources (modified):
    //https://www.digitalocean.com/community/tutorials/nodejs-server-sent-events-build-realtime-app
*/