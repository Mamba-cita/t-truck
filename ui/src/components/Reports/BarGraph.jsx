// BarGraph.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraph = ({ title, data }) => {
  const { labels, datasets } = data;

  const chartData = {
    labels: labels,
    datasets: datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: `rgba(54, 162, 235, 0.2)`, // You can customize colors
      borderColor: `rgba(54, 162, 235, 1)`, // You can customize colors
      borderWidth: 1,
    })),
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <h2>{title}</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarGraph;
