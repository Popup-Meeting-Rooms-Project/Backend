const express = require('express')
const app = express()
const helmet = require('helmet')
const fs = require('fs')
app.use(helmet())

fs.writeFile('logs/process.log', '*** SERVER STARTED ***\n', function () {
  console.log('*** SERVER STARTED ***')

  require('./src/sse/api')
  require('./src/mqtt/mqttClient')
})

process.on('exit', function () {
  console.log('*** SERVER STOPPED ***')
})

app.listen(3000)
