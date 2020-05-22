import React, { Component, createContext } from 'react';

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
	state = {
		isLight: true,
		darkTheme: {
			subTitle: '#DDE4E9',
			titleHelper: '#828F9A',
			appBackground: 'rgb(23, 28, 32)',
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
		},
		lightTheme: {
			subTitle: 'rgb(23, 28, 32)',
			titleHelper: '#828F9A',
			appBackground: 'white',
			borderColor: '#edf4f2',
			metricTitle: 'rgb(23, 28, 32)',
			metricBoxHeaderTitle: 'rgb(23, 28, 32)',
			metricBoxHeaderBg: '#edf4f2',
			metricBoxHelper: '#637381',
			metricBoxBg: ' white',
			antMetricStatsTitle: '#637381',
			metricNumbers: 'rgb(23, 28, 32)',
			firstInSeries: '#0792AF',
			secondInSeries: '#26B4AD',
			thirdInSeries: '#7C80F2',
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

export default ThemeContextProvider;
