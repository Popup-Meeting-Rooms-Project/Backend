const mariadb = require('mariadb')
require('dotenv').config()
const { dbConfig, logger } = require('../config/config')
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: dbConfig.connectionLimit,
})

const dbWrite = {
  insert: async function (message) {
    await pool
      .getConnection()
      .then((conn) => {
        conn.query(
          'INSERT INTO sensor_history_tracker (sensor_json_data) values  (?)',
          [message]
        )

        conn.release()
      })
      .catch((err) => {
        console.log('db/dal DB writting ' + err)
        logger.error('db/dal DB writting ' + err)
      })
  },
}

const dbRead = {
  getRoomUpdate: async function (sensorId, callback) {
    console.log(sensorId)

    await pool
      .getConnection()
      .then((conn) => {
        conn
          .query(
            'SELECT r.id, r.building_floor, r.room_name FROM room r INNER JOIN sensor s ON r.id = s.room_id WHERE s.sensor_id = ?',
            [sensorId]
          )

          .then(function (result) {
            console.log(result[0])

            const queryResult = result[0]

            const roomInfo = {
              id: queryResult.id,
              room_name: queryResult.room_name,
              building_floor: queryResult.building_floor,
            }

            callback(roomInfo)

            conn.release()
          })
      })
      .catch((err) => {
        console.log('db/dal DB reading ' + err)
        logger.fatal('db/dal DB reading ' + err)

        process.exit()
      })
  },

  getAllRooms: async function (callback) {
    await pool
      .getConnection()
      .then((conn) => {
        conn
          .query('SELECT id, room_name, building_floor FROM room;')

          .then(function (queryResult) {
            callback(queryResult)

            conn.release()
          })
      })
      .catch((err) => {
        console.log('db/dal DB reading ' + err)
        logger.fatal('db/dal DB reading ' + err)

        process.exit()
      })
  },
  getAllRooms2: async function (callback) {
    await pool
      .getConnection()
      .then((conn) => {
        conn
          .query('SELECT id, room_name, building, building_floor FROM room;')

          .then(function (queryResult) {
            logger.info('db/dal DB reading ' + queryResult)
            callback(queryResult)

            conn.release()
          })
      })
      .catch((err) => {
        console.log('db/dal DB reading ' + err)
        logger.fatal('db/dal DB reading ' + err)

        process.exit()
      })
  },
}

module.exports = { dbWrite, dbRead }
