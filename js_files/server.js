const express = require('express')
const app = express()
const port = 3001

const fs = require('fs')

fs.writeFile('logs/process.log', '*** SERVER STARTED ***\n', function(){

    console.log("*** SERVER STARTED ***");

    require('./sse/api'); 
    require('./mqtt/mqttClient'); 
});


process.on('exit', function () {
    console.log("*** SERVER STOPPED ***");
  });




