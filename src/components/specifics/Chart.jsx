import React from 'react';
import {Doughnut, Line} from "react-chartjs-2";
import { Chart as Chartjs, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Legend, Tooltip, Filler } from "chart.js";
import { getLastSevenDays } from '../../lib/features';

import { orange, purple, purpleLite, yellow } from '../../constants/color';

Chartjs.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Legend, Tooltip, Filler);

const labels = getLastSevenDays();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: { grid: { display: false } },
    y: {
      beginAtZero: true,
      grid: { display: false }
    },
  },
};

const LineChart = ({value=[]}) => {
  const data ={
    labels,
    datasets: [
      {
        label: 'My Dataset',
        data: value,
        fill: false,
        borderColor: orange, 
        tension: 0.1
      },{
        label: 'My Dataset',
        data: [1, 5, 31, 45, 57, 29, 75],
        fill: false,
        borderColor: purple, 
        tension: 0.1
      }
    ],
   
    
  };
  return (
    <div>
        <Line data={data}  options={lineChartOptions}/>
    </div>
  )
}



const doughnutChartOptions = {
  responsive : true,
  plugins :{
    legend : {
      display: false,
    },
    title :{
      display : false
    },
  },
  cutout: 120,
}

const DoughnutChart = ({value=[], labels=[]}) => {

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Chats vs Group Chats',
        data: value,
        borderColor: [orange, purple], 
        backgroundColor : [yellow, orange],
      },
    ],    
  }

    return (
      <div>
        <Doughnut data={data} options={doughnutChartOptions} />
      </div>
    )
  }

export {LineChart,DoughnutChart };