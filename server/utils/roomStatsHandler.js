const csv = require("csvtojson");
const fs = require('fs');
const path = require('path');


const ROOM_STATS_FILE_NAME = 'data/roomStats.csv';
const TIMESTAMP_HEADER = 'DateTime';
const ID_HEADER = 'Id';
let lastLineIndex;
let lastLine;

async function getTempDataForRoomStats() {
    const data = await csv().fromFile(ROOM_STATS_FILE_NAME);
    console.log(data);
    return convertToChartJSCoordinates(groupBy(data, 'RoomName'), 'Temperature');
}

async function getHumidityDataForRoomStats() {
    const data = await csv().fromFile(ROOM_STATS_FILE_NAME);
    console.log(data);
    return convertToChartJSCoordinates(groupBy(data, 'RoomName'), 'Humidity');
}

async function getRoomSpecificDataForRoomStats(selectedRoomName) {
    console.log(selectedRoomName);
    const data = await csv().fromFile(ROOM_STATS_FILE_NAME);
    const result = data.filter(({ RoomName }) => RoomName.toLowerCase() === selectedRoomName.toLowerCase());
    console.log(result);
    return result;
}

async function getLastDataForRoomStats(selectedRoomName, attribute) {
    console.log('selectedRoomName: ' + selectedRoomName);
    const data = await csv().fromFile(ROOM_STATS_FILE_NAME);
    if(selectedRoomName === 'all') {
        const allStatsByRoomName = groupBy(data, 'RoomName');
        console.log(allStatsByRoomName);
        return Object.keys(allStatsByRoomName).reduce((newList, key) => {
            newList.push({"label": key, "value": getLatestStat(allStatsByRoomName[key])[attribute]});
            return newList;
        }, []);
    } else {
        const resultsFromSpecificRoom = data.filter(({ RoomName }) => RoomName.toLowerCase() === selectedRoomName.toLowerCase());
        const result = getLatestStat(resultsFromSpecificRoom);
        console.log(result);
        return result[attribute];
    }
}

function createNewRoomStatEntry(jsonDetails) {
    let newDetails = [];
    console.log(jsonDetails);
    const data = fs.readFileSync(ROOM_STATS_FILE_NAME, 'utf8');
    const firstLine = data.split('\n')[0];
    lastLineIndex = data.split('\n').length - 1;
    lastLine = data.split('\n')[lastLineIndex];
    const sheetColumns = getSheetColumns(firstLine);
    for (let index = 0; index < sheetColumns.length; index++) {
        console.log('sheetColumn ' + sheetColumns[index] + ';');
        if (sheetColumns[index] === TIMESTAMP_HEADER || sheetColumns[index] === ID_HEADER) {
            newDetails[index] = getSystemValue(sheetColumns[index]);
        } else if (jsonDetails && jsonDetails[sheetColumns[index]]) {
            newDetails[index] = jsonDetails[sheetColumns[index]];
        } else {
            newDetails[index] = '';
        }
    }
    console.log(newDetails);
    const updatedData = data + '\n' + newDetails.join(',');
    fs.writeFileSync(ROOM_STATS_FILE_NAME, updatedData);
}

const getSheetColumns = (firstLine) => {
    return firstLine.split(',');
}

const getSystemValue = (keyValue) => {
    switch (keyValue) {
        case TIMESTAMP_HEADER:
            return new Date().toLocaleString();
        case ID_HEADER:
            if (!lastLineIndex) {
                return 1;
            }
            return parseInt(lastLine.split(',')[0]) + 1;
    }
}

var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

const getLatestStat = (allDetails) => {
    const orderedList = allDetails.sort((firstItem, secondItem) => firstItem.Id - secondItem.Id);
    return orderedList[orderedList.length-1];
}

var convertToChartJSCoordinates = function (groubedByRoom, attribute) {
    let roomsWithData = [];
    Object.keys(groubedByRoom).forEach(function (category) {
        console.log(`Room ${category} has ${groubedByRoom[category].length} members : `);

        groubedByRoom[category].forEach(function (memb, i) {
            console.log(`---->${i + 1}. ${memb.Temperature}.`)
        })
        let datesWithTemp = groubedByRoom[category].map(a => ({
            "x": a.DateTime,
            "y": a[attribute]
        }), {});
        console.log(datesWithTemp);
        roomsWithData.push({ "label": category, "data": datesWithTemp });
        console.log(roomsWithData);
    });
    return roomsWithData;
}

module.exports = { getTempDataForRoomStats, getHumidityDataForRoomStats, 
                    getLastDataForRoomStats, 
                    getRoomSpecificDataForRoomStats, 
                    createNewRoomStatEntry };