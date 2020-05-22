import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';

import { ThemeContext } from '../context/ThemeContext';

import TitleElement from '../components/titleElement/TitleElement';
import AntMetrics from '../components/antMetrics/AntMetrics';
import AnjMetrics from '../components/anjMetrics/AnjMetrics';

class Main extends Component {
	static contextType = ThemeContext;
	render() {
		const { isLight, lightTheme, darkTheme, switchTheme } = this.context;
		const theme = isLight ? lightTheme : darkTheme;
		return (
			<div className='app' style={{ background: theme.appBackground }}>
				<div className='switch'>
					<Switch checked={!isLight} onChange={switchTheme} />
					<p
						style={{
							marginTop: '0px',
							color: theme.subTitle,
							fontWeight: 'bold',
						}}
					>
						Day/Night
					</p>
				</div>
				<TitleElement />
				<AntMetrics />
				<AnjMetrics />
			</div>
		);
	}
}

export default Main;
