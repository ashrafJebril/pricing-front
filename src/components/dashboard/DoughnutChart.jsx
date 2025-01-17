import React from "react";
import { Chart } from "primereact/chart";

const DoughnutChart = ({dataList}) => {
  console.log("🚀 ~ DoughnutChart ~ dataList:", dataList)
  const data = {
    labels: [
      "Sent",
      "Ready",
      "Draft"
    ],
    datasets: [
      {
        data:dataList,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56"
        ],
        hoverBackgroundColor: [
          "#FF4D6D",
          "#2D8BCD",
          "#FFB93F"
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "Quotes Distribution by Category",
        font: {
          size: 16,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(1) + "%";
          return percentage;
        },
        color: "#fff",
        font: {
          weight: "bold",
        },
      },
    },
    cutout: "60%",
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="flex justify-center items-center w-full h-[400px] bg-white p-6 rounded-lg shadow">
      <Chart
        type="doughnut"
        data={data}
        options={options}
        className="w-full max-w-[500px]"
      />
    </div>
  );
};

export default DoughnutChart;
