

function convertToChartJSCoordinates (groubedByRoom, attribute) {
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

module.exports = { convertToChartJSCoordinates };