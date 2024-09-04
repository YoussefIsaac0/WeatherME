import React from 'react';
import { Doughnut } from 'react-chartjs-2';

//
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// Register necessary components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const UVIndexChart = ({ uvIndex }) => {

  // uvIndex is between 0 and 10
  const uvValue = Math.min(Math.max(uvIndex, 0), 10);
  const remainingValue = 10 - uvValue;

  let color;
  if (uvValue > 7) {
    color = 'red'; 
  } else if (uvValue >= 4) {
    color = 'orange';
  } else {
    color = 'green';
  }

  const data = {
    labels: ['UV Index',''],
    datasets: [
      {
        label: 'UV Index out of 10',
        data: [uvValue,remainingValue],
        backgroundColor: [color, 'white'],
        borderColor: ['rgba(75, 192, 192, 0.5)', 'transparent'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio:false,

    plugins: {
      legend: {
        position: 'top', 
      },
      title: {
        display: true,
        text: 'UV Index (out of 10)', 
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw;
            return  `${label}: ${value}`;
          },
        },
      },
    },
    cutoutPercentage: 0,
  };

  return <Doughnut className='overlay' style={{position:'relative', zIndex:'1',width:'200px', height:'200px'}} data={data} options={options} />;
};

export default UVIndexChart;
