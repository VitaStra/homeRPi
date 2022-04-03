const csv = require("csvtojson");
const fs = require('fs');
const { convertToChartJSCoordinates } = require("../utils/chartJSUtils.js");
const { groupBy, getLatestStat, getSheetColumns, getLastEntryIndex, getCountryLocale, getDateTimeFormat } = require("../utils/commonDataUtils.js");

const FLOWERPOT_FILE_NAME = 'data/flowerpots.csv';
const TIMESTAMP_HEADER = 'DateTime';
const ID_HEADER = 'Id';
let lastLineIndex;
let lastLine;

async function getSoilHumidityDataForFlowerPotStats() {
    const data = await csv().fromFile(FLOWERPOT_FILE_NAME);
    return convertToChartJSCoordinates(groupBy(data, 'Plant'), 'SoilHumidity');
}

async function getLastDataForSoilHumidityForFlowerPots(selectedPlant, attribute) {
    console.log('selectedPlant: ' + selectedPlant);
    const data = await csv().fromFile(FLOWERPOT_FILE_NAME);
    if (selectedPlant === 'all') {
        const allStatsByPlant = groupBy(data, 'Plant');
        return Object.keys(allStatsByPlant).reduce((newList, key) => {
            let flowerpotEntry = {
                "label": key,
                "value": getLatestStat(allStatsByPlant[key])[attribute],
                "showWarning": isFlowerPotTankEmpty(allStatsByPlant[key])
            };
            newList.push(flowerpotEntry);
            return newList;
        }, []);
    } else {
        const resultsFromSpecificPlant = data.filter(({ RoomName }) => RoomName.toLowerCase() === selectedRoomName.toLowerCase());
        const result = getLatestStat(resultsFromSpecificPlant);
        return result[attribute];
    }
}

const isFlowerPotTankEmpty = (plantStats) => {
    const countOfLastReadings = 5;
    const counts = {};
    for (let index = plantStats.length - 1; index > plantStats.length - 1 - countOfLastReadings; index--) {
        counts[plantStats[index].HasEmptyTank] = counts[plantStats[index].HasEmptyTank] ? counts[plantStats[index].HasEmptyTank] + 1 : 1;
    }
    return counts['False']/countOfLastReadings <= 0.75;
}

function createNewFlowerPotEntry(jsonDetails) {
    let newDetails = [];
    console.log(jsonDetails);
    const data = fs.readFileSync(FLOWERPOT_FILE_NAME, 'utf8');
    const firstLine = data.split('\n')[0];
    lastLineIndex = getLastEntryIndex(data);
    lastLine = data.split('\n')[lastLineIndex];
    const sheetColumns = getSheetColumns(firstLine);
    for (let index = 0; index < sheetColumns.length; index++) {
        const columnHeader = sheetColumns[index].replace(/\s/g, "");
        if (columnHeader === TIMESTAMP_HEADER || columnHeader === ID_HEADER) {
            newDetails[index] = getSystemValue(columnHeader);
        } else if (jsonDetails && jsonDetails[columnHeader]) {
            newDetails[index] = jsonDetails[columnHeader];
        } else {
            newDetails[index] = '';
        }
    }
    console.log(newDetails);
    const updatedData = data + '\n' + newDetails.join(',');
    fs.writeFileSync(FLOWERPOT_FILE_NAME, updatedData);
}

const getSystemValue = (keyValue) => {
    switch (keyValue) {
        case TIMESTAMP_HEADER:
            return new Date().toLocaleString(getCountryLocale(), getDateTimeFormat());
        case ID_HEADER:
            if (!lastLineIndex) {
                return 1;
            }
            return parseInt(lastLine.split(',')[0]) + 1;
    }
}

module.exports = { createNewFlowerPotEntry, getSoilHumidityDataForFlowerPotStats, getLastDataForSoilHumidityForFlowerPots };