import React, { Component } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import GraphContainer from '../../template/graphContainer/GraphContainer';

import UIGraphicOne from '../../assets/araboard-UI-graphic.png';

import './AntMetrics.css';

class AntMetrics extends Component {
	static contextType = ThemeContext;
	render() {
		const { isLight, lightTheme, darkTheme } = this.context;
		const theme = isLight ? lightTheme : darkTheme;

		return (
			<div className='component-container'>
				<div className='metric-title-container'>
					<h2 style={{ color: theme.metricTitle }}>ANT Metrics</h2>
					<img
						src={UIGraphicOne}
						height='110px'
						width='auto'
						alt=''
					/>
				</div>

				<div
					className='component-sub-container'
					style={{ borderColor: theme.borderColor }}
				>
					<div
						className='box-title'
						style={{
							backgroundColor: theme.metricBoxHeaderBg,
							borderColor: theme.borderColor,
						}}
					>
						<h3 style={{ color: theme.metricBoxHeaderTitle }}>
							ARAGON NETWORK TOKEN
						</h3>
						<h6 style={{ color: theme.metricBoxHelper }}>
							Read more
						</h6>
					</div>

					<div
						className='stats'
						style={{ backgroundColor: theme.metricBoxBg }}
					>
						<div className='individual-stats'>
							<h5 style={{ color: theme.antMetricStatsTitle }}>
								Price
							</h5>
							<h4 style={{ color: theme.metricNumbers }}>
								$1.00
							</h4>
						</div>
						<div className='individual-stats'>
							<h5 style={{ color: theme.antMetricStatsTitle }}>
								Supply
							</h5>
							<h4 style={{ color: theme.metricNumbers }}>39m</h4>
						</div>
						<div className='individual-stats'>
							<h5 style={{ color: theme.antMetricStatsTitle }}>
								Mkt Cap
							</h5>
							<h4 style={{ color: theme.metricNumbers }}>$35m</h4>
						</div>
						<div className='individual-stats'>
							<h5 style={{ color: theme.antMetricStatsTitle }}>
								Staked
							</h5>
							<h4 style={{ color: theme.metricNumbers }}>
								3% ($1m)
							</h4>
						</div>
					</div>
				</div>
				<div
					className='component-sub-container'
					style={{ borderColor: theme.borderColor }}
				>
					<div
						className='box-title'
						style={{
							backgroundColor: theme.metricBoxHeaderBg,
							borderColor: theme.borderColor,
						}}
					>
						<h3 style={{ color: theme.metricBoxHeaderTitle }}>
							ARAGON NETWORK DAO
						</h3>
						<h6 style={{ color: theme.metricBoxHelper }}>
							Read more
						</h6>
					</div>
					<div
						className='stats ant-metrics-stats'
						style={{ backgroundColor: theme.metricBoxBg }}
					>
						<GraphContainer
							title='Participants'
							metric='20.1k'
							metricTitle={theme.firstInSeries}
							metricNumber={theme.metricNumbers}
							pointColor={theme.firstInSeriesPoint}
							axesColor={theme.axesGridLines}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default AntMetrics;
