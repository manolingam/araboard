import React, { Component } from 'react';
import Chart from 'chart.js';

import './GraphContainer.css';

Chart.defaults.global.defaultFontFamily = "'Overpass', sans-serif";

class GraphContainer extends Component {
	drawCharts = () => {
		let ctx = document.getElementById(this.props.title).getContext('2d');
		console.log(this.props.title);
		new Chart(ctx, {
			type: 'line',
			data: {
				labels: ['', '', '', '', '', '', '', '', '', ''],

				datasets: [
					{
						label: '',

						data: [
							100,
							200,
							300,
							400,
							350,
							500,
							450,
							550,
							650,
							600,
						],
						pointBorderWidth: 6,
						pointBackgroundColor: this.props.metricTitle,
						borderColor: this.props.metricTitle,
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
								display: true,
								color: '#4A5661',
							},
							ticks: {
								min: 0,
								max: 1000,
								stepSize: 250,
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
								display: true,
								color: '#4A5661',
							},
						},
					],
				},
			},
		});
	};

	componentDidMount() {
		this.drawCharts();
	}

	render() {
		return (
			<div className='graph-container'>
				<div className='stats'>
					<h5 style={{ color: this.props.metricTitle }}>
						{this.props.title}
					</h5>
					<h4 style={{ color: this.props.metricNumber }}>
						{this.props.metric}
					</h4>
				</div>
				<div className='graph'>
					<div className='chart-container'>
						<canvas
							id={this.props.title}
							style={{ maxWidth: '100%' }}
						></canvas>
					</div>
				</div>
			</div>
		);
	}
}

export default GraphContainer;
