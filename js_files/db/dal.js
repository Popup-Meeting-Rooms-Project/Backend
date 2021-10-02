const mariadb = require('mariadb');
require('dotenv').config() 

const { dbConfig } = require('../config');

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

    const sensorData = JSON.parse(message);

    let conn;

    try {

      conn = await pool.getConnection();

      
      const res = await conn.query(
          "INSERT INTO availability_tracker values (?, ?, ?)", 
          [
            sensorData.id, 
            sensorData.occupency,
            sensorData.timestamp
        ]);
        

      console.log("DB : written " + message);


    } catch (err) {
      console.log("DB access error : " + err)

    } finally {
      if (conn) return conn.end();
    }
  }
}

const dbRead = {
      getAll: async function (sensorId) {

        let conn;

        try {
          conn = await pool.getConnection();
          return await conn.query(
            "SELECT building_floor, room_number FROM room WHERE sensor_id = ?", 
            [
              sensorId
            ]
            );

        } catch (err) {
          console.log("Error : " + err)
        } finally {
          if (conn) return conn.end();
        }
      }
}

module.exports = { dbWrite, dbRead }