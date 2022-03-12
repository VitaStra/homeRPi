const csv = require("csvtojson");
const fs = require('fs');
const path = require('path');

const FLOWERPOT_FILE_NAME = 'data/flowerpots.csv';
const TIMESTAMP_HEADER = 'DateTime';
const ID_HEADER = 'Id';
let lastLineIndex;
let lastLine;

async function getDataFromFlowerpots() {
    const data = await csv().fromFile(FLOWERPOT_FILE_NAME);
    console.log(data);
    return data;
}

function createNewFlowerPotEntry(jsonDetails) {
    let newDetails = [];
    console.log(jsonDetails);
    const data = fs.readFileSync(FLOWERPOT_FILE_NAME, 'utf8');
    const firstLine = data.split('\n')[0];
    lastLineIndex = data.split('\n').length - 1;
    lastLine = data.split('\n')[lastLineIndex];
    const sheetColumns = getSheetColumns(firstLine);
    for (let index = 0; index < sheetColumns.length; index++) {
        console.log('sheetColumn ' +  sheetColumns[index] + ';');
        if (sheetColumns[index] === TIMESTAMP_HEADER || sheetColumns[index] === ID_HEADER) {
            newDetails[index] = getSystemValue(sheetColumns[index]);
        } else if(jsonDetails && jsonDetails[sheetColumns[index]]) {
            newDetails[index] = jsonDetails[sheetColumns[index]];
        } else {
            newDetails[index] = '';
        }
    }
    console.log(newDetails);
    const updatedData = data + '\n' + newDetails.join(',');
    fs.writeFileSync(FLOWERPOT_FILE_NAME, updatedData);
}

const getSheetColumns = (firstLine) => {
    return firstLine.split(',');
}

const getSystemValue = (keyValue) => {
    switch(keyValue) {
		case TIMESTAMP_HEADER:
			return new Date().toLocaleString();
		case ID_HEADER:
            if(!lastLineIndex) {
                return 1;
            }
			return parseInt(lastLine.split(',')[0]) + 1;
	}
}

module.exports = { getDataFromFlowerpots, createNewFlowerPotEntry };