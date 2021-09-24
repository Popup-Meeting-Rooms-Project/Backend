module.exports = {

    db_write : {
        insert : function(topic, message){
            console.log("DB : written " + message + " in " + topic)
        }
    }

}