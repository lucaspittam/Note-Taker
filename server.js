//server.js for setting up express server
const express = require('express');
const path = require('path');
const {db} = require('./db/db.json')
const uniqid = require('uniqid');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

function findById(id, noteList) {
    return noteList.filter(note => note.id === id)[0];
}

function addNewNote(body, noteList) {
    let newNote = body;
    noteList.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({db: noteList}, null, 2)
    );
}
function removeNote (id, noteList) {
    const removeThisNote = findById(id, noteList);
    for (let i = 0; i<noteList.length; i++){
        if (noteList[i].id === removeThisNote.id) {
            noteList.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify({db: noteList}, null, 2)
            );
        }
    };
}
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    let results = db;
    res.json(results);
})

app.post('/api/notes', (req, res) => {
    //generate a new id 
    req.body.id = uniqid();

    res.json(req.body);
    addNewNote(req.body, db);

})

app.delete('/api/notes/:id', (req, res) => {
    removeNote(req.params.id, db);
    res.json(req.body);
});

app.listen(PORT, () => {console.log(`API server now on port ${PORT}!`);}); 