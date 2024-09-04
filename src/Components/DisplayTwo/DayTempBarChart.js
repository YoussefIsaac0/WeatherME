import React from 'react';
import { Bar } from 'react-chartjs-2';
//To avoid huge bundle size
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import useMouseHoverEffect from '../../useMouseHoverEffect';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const BarChart = ({ data,setActiveSection,index }) => {
  const container2 = useMouseHoverEffect()

  const chartData = {
    labels: data.map(item => item.day), // X-axis labels
    datasets: [
        {
            label: 'Average Temperature', 
            data: data.map(item => item.tempC), 
            backgroundColor: 'steelblue', 
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }
        
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
        text: 'Average Daily Temperatures',
        color:"white"
      },
    },
    scales: {
      x: {
        
        border: {
            color: 'white',
        },
        ticks: {
            color:'white',
        },
  
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)',
          color:"white",
          borderColor:'white'
        },
        border: {
            color: 'white',
        },
        ticks: {
            color:'white',
        },
  
        beginAtZero: true,
      },
    },
    
    animation: {
      duration: 500, 
      easing: 'easeInOut',
      
    },
  };

  return (
    <div className="container drag graph" ref={container2} style={{}} draggable onDragStart={() => setActiveSection(index)} onDragEnd={() => setActiveSection(null)}>
      <Bar data={chartData} options={options} className='graph' />
    </div>
  )
};

export default BarChart;
