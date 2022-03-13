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
            text: 'Placeholder',
        },
    },
    scales: {
        y: {
            min: 1,
            max: 100,
        },
        x: {
            // type: 'time',
            // time: {
            //     unit: "day",
            // }
        }
    },
};

// this is getting overriden by "second call"
export function LineChart(props) {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        console.log(props.apiService);
        options.scales.y.min = parseInt(props.min);
        options.scales.y.max = parseInt(props.max);
        options.plugins.title.text = props.title;
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