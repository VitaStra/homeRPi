

const getLastEntryIndex = (csvData) => {
    return csvData.split('\n').length - 1;
}
const getSheetColumns = (csvData) => {
    const firstLine = csvData.split('\n')[0];
    return firstLine.split(',');
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

const getCountryLocale = () => {
    'en-GB';
}

const getDateTimeFormat = () => {
    return {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit'};
}

module.exports = { groupBy, getLatestStat, getSheetColumns, getLastEntryIndex, getCountryLocale, getDateTimeFormat };