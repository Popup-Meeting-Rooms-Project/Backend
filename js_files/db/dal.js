const mariadb = require('mariadb');
const { dbConfig } = require('../config');

const pool = mariadb.createPool({
    host: dbConfig.host, 
    user:dbConfig.user, 
    password: dbConfig.password,
    connectionLimit: dbConfig.connectionLimit
});

const dbWrite = {

    insert : async function(message){

        let conn;

        try {
          conn = await pool.getConnection();

          const res = await conn.query(
              "INSERT INTO Data value (?, ?, ?)", 
              [
                message["id"], 
                message["occupancy"],
                message["timestamp"]
            ]);
      
        } catch (err) {
          throw err;
        } finally {
          if (conn) return conn.end();

          console.log("DB : written " + message);
        }
    }
}
const dbRead = {
    getAll : async function(){

        let conn;

        try {
          conn = await pool.getConnection();
          return await conn.query("SELECT * FROM Data");

        } catch (err) {
          throw err;
        } finally {
          if (conn) return conn.end();
        }
    }
}

module.exports = {dbWrite, dbRead}