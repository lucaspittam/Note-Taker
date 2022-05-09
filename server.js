//server.js for setting up express server
const express = require('express');
const path = require('path');
const {db} = require('./db/db.json')
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

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

app.listen(PORT, () => {console.log(`API server now on port ${PORT}!`);}); 