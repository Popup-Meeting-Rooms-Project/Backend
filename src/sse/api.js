const express = require('express')
const app = express()
const { apiConfig, logger } = require('../config/config')
const { sseRegistration: sse } = require('../sse/sse')
const cors = require('cors')
const helmet = require('helmet')

app.use(helmet())
app.use(cors())
app.get('/register', sse.register)
app.get('/getAllRooms', sse.getAllRooms)
app.get('/getAllRoomsTesting', sse.getAllRooms2)

app.listen(apiConfig.port, () => {
  console.log('sse/api Listening on port ' + apiConfig.port)
  logger.info('sse/api Listening on port ' + apiConfig.port)
})
