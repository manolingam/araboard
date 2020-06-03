import React, { useEffect } from 'react';
import Chart from 'chart.js';
import * as _ from 'lodash';

import './GraphContainer.css';

Chart.defaults.global.defaultFontFamily = "'Overpass', sans-serif";

export function GraphContainer(props) {
  const { title, pointColor, axesColor, metricTitle, metric, metricNumber, data } = props;
  const points = data?.map((point) => point.value) || [100, 200, 300, 400, 350, 500, 450, 550, 650, 600];
  const labels = data?.map((point) => point.label) || ['', '', '', '', '', '', '', '', '', ''];

  var removedPoints = points.splice(0,3) // removed last 3 elements
  var removedLabels = labels.splice(0,3) // removed last 3 elements

  // function to format big numbers in 2K, 320K, etc.
  const kFormatter = (num) => {
    return Math.abs(num) > 1000000 ? Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
  }

  const drawCharts = React.useCallback(() => {

    let plotPointGap = (_.max(points) - _.min(points)) / 3 // the step gap for each point

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
                min: _.min(points) - plotPointGap,
                // max: _.max(points) + plotPointGap,
                stepSize: plotPointGap,
                padding: 10,
  
                callback: function (label, index, labels) {
                  switch (label) {
                    default:
                      return kFormatter(label.toFixed(3));
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
