import React from 'react';

import ThemeContextProvider from './context/ThemeContext';

import Main from './pages/Main';

import './App.css';

class App extends React.Component {
	render() {
		return (
			<ThemeContextProvider>
				<Main />
			</ThemeContextProvider>
		);
	}
}

export default App;
