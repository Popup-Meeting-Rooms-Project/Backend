const { mqttClientConfig, logger } = require('../config/config')
const { dbRead: db } = require('../db/dal')
const clients = []
const roomsList = []
const roomsList2 = []

db.getAllRooms(function (queryResult) {
  queryResult.forEach((room) => {
    room.detected = false

    roomsList.push(room)
  })
  console.log(roomsList)
})

db.getAllRooms2(function (queryResult) {
  queryResult.forEach((elem) => {
    const room = {
      id: elem.id,
      room_name: elem.room_name,
      detected: false,
    }

    var buildingExist = false

    roomsList2.forEach((building) => {
      if (building.name == elem.building) {
        buildingExist = true

        var floorExist = false

        building.floors.forEach((floor) => {
          if (floor.id == elem.floor) {
            floorExist = true
            floor.rooms.push(room)
          }
        })

        if (!floorExist) {
          const newFloor = {
            id: elem.floor,
            rooms: [],
          }

          newFloor.rooms.push(room)
          building.floors.push(newFloor)
        }
      }
    })

    if (!buildingExist) {
      const newFloor = {
        id: elem.floor,
        rooms: [],
      }

      const newBuilding = {
        name: elem.building,
        building_floor: [],
      }

      newFloor.rooms.push(room)
      newBuilding.floors.push(newFloor)
      roomsList2.push(newBuilding)
    }
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
  getAllRooms2: function (req, res) {
    res.json(roomsList2)
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
  //client.response.write(JSON.stringify(data))
  client.response.write('data:' + JSON.stringify(data) + '\n\n')
}

module.exports = { sseRegistration, sseEvents }
