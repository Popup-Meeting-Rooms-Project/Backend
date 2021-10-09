const mariadb = require('mariadb');
require('dotenv').config() 

const { dbConfig, logger } = require('../config');



const pool = mariadb.createPool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  connectionLimit: dbConfig.connectionLimit
});


const dbWrite = {

  insert: async function (message) {

    await pool.getConnection()
    .then(conn => {

    conn.query(
        "INSERT INTO sensor_history_tracker values (?)",
        [message]);

    conn.release();
    })
    .catch(err => {
      console.log("db/dal DB writting " + err);
      logger.error("db/dal DB writting " + err);
    });

  }
}

const dbRead = {

  getRoomInfo: async function (sensorId) {

    await pool.getConnection()
    .then(conn => {

    conn.query(
            "SELECT r.building_floor, r.room_number FROM room r INNER JOIN sensor s ON r.id = s.room_id WHERE s.sensor_id = ?", 
            [sensorId]);

    const roomInfo = {
      building_floor: queryResult.building_floor,
      room_number: queryResult.room_number
    }

    conn.release();

    return roomInfo;

    })
    .catch(err => {
      console.log("db/dal DB reading " + err);
      logger.fatal("db/dal DB reading " + err);

      process.exit();
      
    });
  }
}

module.exports = { dbWrite, dbRead }