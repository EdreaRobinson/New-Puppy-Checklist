require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {SERVER_PORT} = process.env;
const {seed, getChecklist, createItem, deleteItem} = require('./controller1.js');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json())

app.post('/seed', seed);

app.get('/checklist', getChecklist);

app.post('/checklist', createItem)

app.delete('/checklist/:item_id', deleteItem)




app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))

