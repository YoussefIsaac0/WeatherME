import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const HumidityChart = ({ humidity }) => {
  const humidityValue = Math.min(Math.max(humidity, 0), 100);
  const remainingValue = 100 - humidityValue;

  let color;
  if (humidityValue > 70) {
    color = 'red';
  } else if (humidityValue >= 40) {
    color = 'orange';
  } else {
    color = 'green';
  }

  const data = {
    labels: ['Humidity', ''],
    datasets: [
      {
        label: 'Humidity %',
        data: [humidityValue, remainingValue],
        backgroundColor: [color, 'white'],
        borderColor: ['rgba(75, 192, 192, 0.5)', 'transparent'],
        borderWidth: 1,
      },
    ],
  };


  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top', 
      },
      title: {
        display: true,
        text: 'Humidity in percentages', 
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw;
            return `${label}: ${value}%`;
          },
        },
      },
    },
    cutout: '50%', 


  };

  return (
    <Doughnut
      className='overlay'
      style={{ position: 'relative', zIndex: '1', width: '200px', height: '200px' }}
      data={data}
      options={options}
    />
  );
};

export default HumidityChart;
