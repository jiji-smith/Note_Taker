//set up the server
const express = require("express")
const path = require("path")
const fs = require("fs")

const app = express()
const PORT = process.env.PORT || 13000

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(__dirname + '/public'))

app.get("/notes", function(request,response){
  console.log(response);
  response.sendFile(path.join(__dirname + '/public', "notes.html"))
})

//server on
app.listen(PORT, function(request, response){
    console.log("app listening on port : ", PORT)
})
