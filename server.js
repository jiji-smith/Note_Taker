
//set up the server
const express = require("express")

const app = express()
const PORT = process.env.PORT || 13000

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(__dirname + '/public'))


app.listen(PORT, function(request, response){
    console.log("app listening on port : ", PORT)
})
