const express = require('express')
const app = express()
// eslint-disable-next-line
const port = 3000
const helmet = require('helmet')
const cors = require('cors')

app.use(helmet())

app.use(
  cors({
    origin: '*',
  })
)

const fs = require('fs')

fs.writeFile('logs/process.log', '*** SERVER STARTED ***\n', function () {
  console.log('*** SERVER STARTED ***')

  require('./src/sse/api')
  require('./src/mqtt/mqttClient')
})

process.on('exit', function () {
  console.log('*** SERVER STOPPED ***')
})
