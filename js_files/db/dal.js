const mariadb = require('mariadb');
require('dotenv').config() 

const { dbConfig } = require('../config');


try {
  const pool = mariadb.createPool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    connectionLimit: dbConfig.connectionLimit
  });
}catch (err) {
  console.log("DB access error : " + err)

}

const dbWrite = {

  insert: async function (message) {

    let conn;

    

    try {

      conn = await pool.getConnection();
      console.log("conn " + conn)

      const res = await conn.query(
          "INSERT INTO sensor_history_tracker values (?)", [message]);
        

      console.log("DB : written " + message);


    } catch (err) {
      console.log("DB writting error : " + err)

    } finally {
      if (conn) return conn.end();
    }
  }
}

const dbRead = {

      getRoomInfo: async function (sensorId) {

        let conn;

        

        try {
          conn = await pool.getConnection();
          console.log("conn " + conn)
          const queryResult = await conn.query(
            "SELECT r.building_floor, r.room_number FROM room r INNER JOIN sensor s ON r.id = s.room_id WHERE s.sensor_id = ?", 
            [
              sensorId
            ]
            );

            const roomInfo = {
              building_floor: queryResult.building_floor,
              room_number: queryResult.room_number
            }

            return roomInfo;

        } catch (err) {
          console.log("DB reading error : " + err)
        } finally {
          if (conn) return conn.end();
        }
      }
}

module.exports = { dbWrite, dbRead }