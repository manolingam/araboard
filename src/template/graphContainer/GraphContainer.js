import React, { Component, useEffect } from 'react';
import Chart from 'chart.js';

import './GraphContainer.css';

Chart.defaults.global.defaultFontFamily = "'Overpass', sans-serif";

export function GraphContainer(props) {
  const { title, pointColor, axesColor, metricTitle, metric, metricNumber } = props;

  const drawCharts = () => {
    let ctx = '';
    ctx = document.getElementById(title).getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['', '', '', '', '', '', '', '', '', ''],

        datasets: [
          {
            label: '',
            data: [100, 200, 300, 400, 350, 500, 450, 550, 650, 600],
            pointBorderWidth: 6,
            pointBackgroundColor: pointColor,
            borderColor: pointColor,
            borderWidth: 2,
            borderDash: [7, 5],
            backgroundColor: 'transparent',
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        maintainAspectRatio: false,

        scales: {
          yAxes: [
            {
              stacked: true,
              gridLines: {
                drawBorder: false,
                display: true,
                color: axesColor,
                zeroLineColor: pointColor,
                tickMarkLength: 0,
              },
              ticks: {
                min: 0,
                max: 1000,
                stepSize: 250,
                padding: 10,
                callback: function (label, index, labels) {
                  switch (label) {
                    case 0:
                      return '0';
                    case 250:
                      return '10K';
                    case 500:
                      return '20K';
                    case 750:
                      return '30k';
                    case 1000:
                      return '40k';
                    default:
                      return '';
                  }
                },
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                display: true,
                color: axesColor,
                zeroLineColor: pointColor,
                tickMarkLength: 0,
              },
            },
          ],
        },
      },
    });
  };

  useEffect(() => {
    drawCharts();
  }, []);

  return (
    <div className="graph-container">
      <div className="stats">
        <h5 style={{ color: metricTitle }}>{title}</h5>
        <h4 style={{ color: metricNumber }}>{metric}</h4>
      </div>
      <div className="graph">
        <div className="chart-container">
          <canvas id={title} style={{ maxWidth: '100%' }}></canvas>
        </div>
      </div>
    </div>
  );
}
