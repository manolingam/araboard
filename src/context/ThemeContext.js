import React, { Component, createContext } from 'react';

export const ThemeContext = createContext();

export class ThemeContextProvider extends Component {
	state = {
		isLight: true,
		darkTheme: {
			subTitle: '#DDE4E9',
			titleHelper: '#828F9A',
			appBackground: '#192029',
			borderColor: '#4a5661',
			metricTitle: '#DDE4E9',
			metricBoxHeaderTitle: '#DDE4E9',
			metricBoxHeaderBg: '#384149',
			metricBoxHelper: '#637381',
			metricBoxBg: ' #212B36',
			antMetricStatsTitle: '#637381',
			metricNumbers: '#DDE4E9',
			firstInSeries: '#0792AF',
			secondInSeries: '#26B4AD',
			thirdInSeries: '#7C80F2',
			firstInSeriesPoint: '#08bee5',
			secondInSeriesPoint: '#3fe8e0',
			thirdInSeriesPoint: '#7c80f2',
			axesGridLines: '#4A5661',
		},
		lightTheme: {
			subTitle: 'rgb(23, 28, 32)',
			titleHelper: '#828F9A',
			appBackground: '#F9FAFC',
			borderColor: '#DDE4E9',
			metricTitle: 'rgb(23, 28, 32)',
			metricBoxHeaderTitle: 'rgb(23, 28, 32)',
			metricBoxHeaderBg: '#e7eaef',
			metricBoxHelper: '#637381',
			metricBoxBg: 'white',
			antMetricStatsTitle: '#637381',
			metricNumbers: 'rgb(23, 28, 32)',
			firstInSeries: '#0792AF',
			secondInSeries: '#26B4AD',
			thirdInSeries: '#7C80F2',
			firstInSeriesPoint: '#08bee5',
			secondInSeriesPoint: '#3fe8e0',
			thirdInSeriesPoint: '#7c80f2',
			axesGridLines: '#DDE4E9',
		},
	};
	switchTheme = () => {
		this.setState({ isLight: !this.state.isLight });
	};
	render() {
		return (
			<ThemeContext.Provider
				value={{ ...this.state, switchTheme: this.switchTheme }}
			>
				{this.props.children}
			</ThemeContext.Provider>
		);
	}
}
