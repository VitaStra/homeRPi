const csv = require("csvtojson");
const fs = require('fs');
const { convertToChartJSCoordinates } = require("../utils/chartJSUtils.js");
const { groupBy, getLatestStat, getSheetColumns, getLastEntryIndex } = require("../utils/commonDataUtils.js");


const ROOM_STATS_FILE_NAME = 'data/roomStats.csv';
const TIMESTAMP_HEADER = 'DateTime';
const ID_HEADER = 'Id';
let lastLineIndex;
let lastLine;

async function getTempDataForRoomStats() {
    const data = await csv().fromFile(ROOM_STATS_FILE_NAME);
    return convertToChartJSCoordinates(groupBy(data, 'RoomName'), 'Temperature');
}

async function getHumidityDataForRoomStats() {
    const data = await csv().fromFile(ROOM_STATS_FILE_NAME);
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
    lastLineIndex = getLastEntryIndex(data);
    lastLine = data.split('\n')[lastLineIndex];
    const sheetColumns = getSheetColumns(data);
    for (let index = 0; index < sheetColumns.length; index++) {
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

module.exports = { getTempDataForRoomStats, getHumidityDataForRoomStats, 
                    getLastDataForRoomStats, 
                    getRoomSpecificDataForRoomStats, 
                    createNewRoomStatEntry };