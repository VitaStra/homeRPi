const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const { getDataFromFlowerpots, createNewFlowerPotEntry } = require("./utils/flowerPotHandler.js");
const { getDataForRoomStats, getLastDataForRoomStats, getRoomSpecificDataForRoomStats, createNewRoomStatEntry } = require("./utils/roomStatsHandler.js");
const app = express()
const jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.render('index.html');
})

app.get('/flowerpots', function (req, res) {
  getDataFromFlowerpots()
    .then((data) => {
      console.log('res data: ' + data);
      res.send(data);
    });
})

app.get('/rooms/temp', function (req, res) {
  getDataForRoomStats()
    .then((groubedByRoom) => {
        console.log('res data: ' + groubedByRoom);
        res.send({datasets:groubedByRoom});
    })
})

app.get('/temp/:room', function (req, res) {
  getRoomSpecificDataForRoomStats(req.params.room)
    .then((data) => {
      console.log('res data: ' + data);
      res.send(data);
    });
})

app.get('/temp/now/:room', function (req, res) {
  getLastDataForRoomStats(req.params.room)
    .then((data) => {
      console.log('res data: ' + data);
      res.send(data);
    });
})

app.post('/flowerpot', jsonParser, (req, res) => {
  console.log(req.body.Id);
  createNewFlowerPotEntry(req.body);
  res.send('OK');
})

app.post('/roomStat', jsonParser, (req, res) => {
  console.log(req.body.Id);
  createNewRoomStatEntry(req.body);
  res.send('OK');
})

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server again!" });
});

app.listen(3001)