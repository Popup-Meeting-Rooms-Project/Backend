const express = require('express')
const app = express()

//app.use(express.json());


app.get('/register', (req,res) => {
    //method register

    //respond 200 and keep connection
    res.send("Registering client")
})

app.listen(8080, () => {
    console.log("Server listening on port 8080 localHost")
})


