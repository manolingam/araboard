import React, { useEffect } from 'react';
import Chart from 'chart.js';
import * as _ from 'lodash';

import './GraphContainer.css';

Chart.defaults.global.defaultFontFamily = "'Overpass', sans-serif";

export function GraphContainer(props) {
  const { title, pointColor, axesColor, metricTitle, metric, metricNumber, data } = props;
  const points = data?.map((point) => point.value) || [100, 200, 300, 400, 350, 500, 450, 550, 650, 600];
  const labels = data?.map((point) => point.label) || ['', '', '', '', '', '', '', '', '', ''];

  const drawCharts = React.useCallback(() => {
    let ctx = '';
    ctx = document.getElementById(title).getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,

        datasets: [
          {
            label: '',
            data: points,
            pointBorderWidth: 2,
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
          enabled: true,
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
                min: _.min(points) * 0.8,
                max: _.max(points) * 1.2,
                stepSize: 5000,
                padding: 10,
                callback: function (label, index, labels) {
                  switch (label) {
                    case 0:
                      return '0';
                    case 10000:
                      return '10K';
                    case 20000:
                      return '20K';
                    case 30000:
                      return '30k';
                    case 40000:
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
  }, [axesColor, labels, pointColor, points, title]);

  useEffect(() => {
    drawCharts();
  }, [drawCharts]);

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
