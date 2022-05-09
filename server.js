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

function addNewNote(body, noteList) {
    let newNote = body;
    db.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({db: noteList}, null, 2)
    );
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
    console.log(req.body);
    res.json(req.body);
    addNewNote(req.body, db);

})

app.listen(PORT, () => {console.log(`API server now on port ${PORT}!`);}); 