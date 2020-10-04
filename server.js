//set up the server
const express = require("express")
const path = require("path")
const fs = require("fs")

const app = express()
const PORT = process.env.PORT || 13000

//middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/public'))


//GET /notes - Should return the notes.html file.
app.get("/notes", function (request, response) {
    console.log(response);
    response.sendFile(path.join(__dirname + '/public', "notes.html"))
})

//GET /api/notes - Should read the db.json file and return all saved notes as JSON.
// I created API!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get("/api/notes", function (request, response) {
    console.log(response);
    fs.readFile(__dirname + "/db/db.json", (error, data) => {
        if (error) throw error;
        const notes = JSON.parse(data)
        return response.json(notes)
    })
});

//POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post("/api/notes", function (request, response) {
    const newNote = request.body
    let allNote = []
    fs.readFile(__dirname + "/db/db.json", "UTF8", function (error, data) {
        if (error) throw error;
        allNote = JSON.parse(data)
        allNote.push(newNote);
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(allNote), "UTF8", function (error) {
            if (error) throw error;
            response.end();
        })
    })
})

//DELETE /api/notes/:id



//GET * - Should return the index.html file
app.get("*", function (request, response) {
    console.log(response);
    response.sendFile(path.join(__dirname + '/public', "index.html"))
})

//server on
app.listen(PORT, function (request, response) {
    console.log("app listening on port : ", PORT)
})


