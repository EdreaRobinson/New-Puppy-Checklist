require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {SERVER_PORT} = process.env;
const {seed, getChecklist, createItem} = require('./controller1.js');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));



// DEV
app.post('/seed', seed);



// COUNTRIES
app.get('/checklist', getChecklist);

// // CITIES
app.post('/checklist', createItem)

// app.delete('/cities/:id', deleteCity)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))