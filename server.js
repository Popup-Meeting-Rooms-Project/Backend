const express = require('express');
const app = express();
const port = 3000;
const helmet = require ('helmet');
const cors = require('cors');

app.use(helmet());

app.use(cors({
	origin: "*",
})
)

const fs = require('fs')

//app.use(function (req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*")
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//    next()
//})

fs.writeFile('logs/process.log', '*** SERVER STARTED ***\n', function(){

    console.log("*** SERVER STARTED ***");

    require('./sse/api'); 
    require('./mqtt/mqttClient'); 
});


process.on('exit', function () {
    console.log("*** SERVER STOPPED ***");
  });




