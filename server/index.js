const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const { getSoilHumidityDataForFlowerPotStats, getLastDataForSoilHumidityForFlowerPots, createNewFlowerPotEntry } = require("./dataHandlers/flowerPotHandler.js");
const { getTempDataForRoomStats, getHumidityDataForRoomStats, getLastDataForRoomStats, getRoomSpecificDataForRoomStats, createNewRoomStatEntry } = require("./dataHandlers/roomStatsHandler.js");
const app = express()
const jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.render('index.html');
})

app.get('/flowerpots/soil', function (req, res) {
  getSoilHumidityDataForFlowerPotStats()
    .then((groupedByPlant) => {
      // console.log('res data for: /flowerpots/soil \n' + JSON.stringify(groupedByPlant));
      res.send({datasets:groupedByPlant});
    });
})

app.get('/flowerpots/soil/now/:plant', function (req, res) {
  getLastDataForSoilHumidityForFlowerPots(req.params.plant, 'SoilHumidity')
  .then((data) => {
    // console.log(`res data for: flowerpots/soil/now/${req.params.plant} \n  ${JSON.stringify(data)}`);
    res.send(data);
  });
})

app.get('/rooms/temp', function (req, res) {
  getTempDataForRoomStats()
    .then((groupedByRoom) => {
        // console.log('res data for: /rooms/temp \n' + JSON.stringify(groupedByRoom));
        res.send({datasets:groupedByRoom});
    })
})

app.get('/rooms/humidity', function (req, res) {
  getHumidityDataForRoomStats()
    .then((groupedByRoom) => {
        // console.log('res data for: /rooms/humidity \n' + JSON.stringify(groupedByRoom));
        res.send({datasets:groupedByRoom});
    })
})

app.get('/temp/:room', function (req, res) {
  getRoomSpecificDataForRoomStats(req.params.room)
    .then((data) => {
      // console.log('res data: ' + data);
      res.send(data);
    });
})

app.get('/temp/now/:room', function (req, res) {
  getLastDataForRoomStats(req.params.room, 'Temperature')
    .then((data) => {
      // console.log('res data: ' + data);
      res.send(data);
    });
})

app.get('/humidity/now/:room', function (req, res) {
  getLastDataForRoomStats(req.params.room, 'Humidity')
    .then((data) => {
      // console.log('res data: ' + data);
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