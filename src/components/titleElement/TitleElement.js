import React, { Component } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

import './TitleElement.css';

class TitleElement extends Component {
  static contextType = ThemeContext;
  render() {
    const { isLight, lightTheme, darkTheme } = this.context;
    const theme = isLight ? lightTheme : darkTheme;

    return (
      <div className="title-element">
        <div className="container-1">
          <h1>Aragon Network Metrics</h1>
          <p style={{ color: theme.titleHelper }}>
            <a href={'//aragon.org'}>Visit Aragon.org</a>
          </p>
        </div>
        <div className="container-2">
          <p style={{ color: theme.subTitle }}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
            dolore magna aliquam erat volutpat.
          </p>
        </div>
      </div>
    );
  }
}

export default TitleElement;
