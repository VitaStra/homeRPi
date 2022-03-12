const lineColors = {
    0: 'rgb(255, 99, 132)',
    1: 'rgb(53, 162, 235)',
    2: 'rgb(255, 205, 86)',
}

const pointColors = {
    0: 'rgba(255, 99, 132, 0.5)',
    1: 'rgba(53, 162, 235, 0.5)',
    2: 'rgba(255, 205, 86, 0.5)',
}

export function setBorderColors(datasets) {
    Object.keys(datasets).forEach(function(category, i) {
        datasets[category].borderColor = lineColors[i];
        datasets[category].backgroundColor = pointColors[i];
    });
}