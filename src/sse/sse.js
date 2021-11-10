const { mqttClientConfig, logger } = require('../config/config')
const { dbRead: db } = require('../db/dal')
const clients = []
const roomsList = []

db.getAllRooms(function (queryResult) {

  queryResult.forEach((room) => {
    room.detected = false

    roomsList.push(room)
  })
  console.log(roomsList)
})

const sseRegistration = {
  register: function (request, response) {
    const headers = {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
    }

    response.writeHead(200, headers)

    const clientId = Date.now()

    const newClient = {
      id: clientId,
      topic: mqttClientConfig.topic,
      response,
    }

    clients.push(newClient)

    console.log('sse/sse Connection with client ' + clientId)
    logger.info('sse/sse Connection with client ' + clientId)

    request.on('close', () => {
      ;(function () {
        for (let i = 0; i < clients.length; i++) {
          if (clients[i].id === clientId) {
            clients.splice(i, 1)
            return
          }
        }
      })()

      console.log('sse/sse Disconnection from client ' + clientId)
      logger.info('sse/sse Disconnection from client ' + clientId)
    })
  },
  getAllRooms: function (req, res) {
    console.log('Sending allrooms')
    console.log(roomsList)
    res.json(roomsList)
  },
}

const sseEvents = {
  newEvent: function (message) {
    let msgJson = JSON.parse(message)
    let sensorId = msgJson['sensor']

    db.getRoomUpdate(sensorId, function (roomInfo) {
      roomInfo.detected = msgJson['detected']
      /*
            const data = {
                id: roomInfo.id,
                building_floor: roomInfo.building_floor,
                room_name: roomInfo.room_name,
                room_availability: msgJson["detected"],
                timeStamp: Date.now()
            }
            */
      update(roomsList, roomInfo.id, msgJson['detected'])

      clients.forEach((client) => sendData(roomInfo, client))
    })
  },
}

const update = function (roomsList, id, detected) {
  roomsList.forEach((room) => {
    if (room.id === id) {
      room.detected = detected
    }
  })
}

const sendData = function (data, client) {
  client.response.write(JSON.stringify(data))
}

module.exports = { sseRegistration, sseEvents }
