

function convertToChartJSCoordinates (arrayGroubedByAttribute, attribute) {
    let categoryWithData = [];
    Object.keys(arrayGroubedByAttribute).forEach(function (category) {
        let dateWithStat = arrayGroubedByAttribute[category].map(a => ({
            "x": a.DateTime,
            "y": a[attribute]
        }), {});
        categoryWithData.push({ "label": category, "data": dateWithStat });
    });
    return categoryWithData;
}

module.exports = { convertToChartJSCoordinates };