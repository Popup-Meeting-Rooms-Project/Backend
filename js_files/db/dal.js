const dbWrite = {
    insert : function(topic, message){
        console.log("DB : written " + message + " in " + topic)
    }
}
const dbRead = {

}

module.exports = {dbWrite, dbRead}