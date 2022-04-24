import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { setBorderColors } from './ChartUtils.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function DataAsLineChart(props) {
    const [data, setData] = React.useState(null);
    let options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: props.title ? props.title : 'Placeholder',
            },
        },
        scales: {
            y: {
                min: parseInt(props.min) ? parseInt(props.min) : 100,
                max: parseInt(props.max) ? parseInt(props.max) : 100,
            },
        },
    };
    React.useEffect(() => {
        fetch(props.apiService)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setBorderColors(data.datasets);
                setData(data);
            });
    }, []);

    if (!data) {
        console.log('loading...');
        return null;
    } else {
        return <Line
            options={options}
            data={data}
            width={10}
            height={8}
        />;
    }
}

class LineChart extends React.Component {
    render() {
        return (
            <DataAsLineChart apiService={this.props.apiService} min={this.props.min} max={this.props.max} title={this.props.title} />
        );
    }
}

export default LineChart;