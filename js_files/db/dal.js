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



    let conn;

    try {

      conn = await pool.getConnection();


      /*
      const res = await conn.query(
          "INSERT INTO Data value (?, ?, ?)", 
          [
            message["id"], 
            message["occupancy"],
            message["timestamp"]
        ]);
        */

      console.log("DB : written " + message);


    } catch (err) {
      console.log("DB access error : " + err)

    } finally {
      if (conn) return conn.end();
    }
  }
}

    const dbRead = {
      getAll: async function () {

        let conn;

        try {
          conn = await pool.getConnection();
          return await conn.query("SELECT * FROM Data");

        } catch (err) {
          console.log("Error : " + err)
        } finally {
          if (conn) return conn.end();
        }
      }
    }

    module.exports = { dbWrite, dbRead }