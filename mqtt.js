const data = [];

module.exports = function(callback){  

    return {

        addMeasure : function(request, response){

            id = request.params.id;

            measure = {
                "id": id,
                "room_number": 3,
                "occupancy": false,
                "timestamp": "2017-07-01T18:36:56.547306"
              }

            data.push(measure);

            callback.onMessage(data);
        }
    }
}



