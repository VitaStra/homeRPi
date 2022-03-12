import React from 'react'; import {
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

export const options = {
    responsive: true,
    plugins: {
        legend: {
            //   position: 'top' as const,
            position: 'top',
        },
        title: {
            display: true,
            text: 'Teplota podle pokojů',
        },
    },
    scales: {
        y: {
            min: 15,
            max: 30,
        },
        x: {
            // type: 'time',
            // time: {
            //     unit: "day",
            // }
        }
    },
};

export function TemperatureChart(props) {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        console.log(props.apiService);
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
        return <Line options={options} data={data} />;
    }
}