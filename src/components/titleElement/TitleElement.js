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
            <a href={'//aragon.org'} target="_blank" rel="noopener noreferrer">
              Visit Aragon.org
            </a>
          </p>
        </div>
        <div className="container-2">
          <p style={{ color: theme.subTitle }}>
            The Aragon Network is a digital jurisdiction that offers services to{' '}
            <a
              style={{ color: theme.titleHelper, textDecoration: 'none' }}
              href="//aragon.org/dao"
              target="_blank"
              rel="noopener noreferrer"
            >
              DAOs
            </a>
            . It does so via linked protocols like{' '}
            <a
              style={{ color: theme.titleHelper, textDecoration: 'none' }}
              href="//aragon.org/court"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aragon Court
            </a>
            . All these linked protocols have their tokens linked to{' '}
            <a
              style={{ color: theme.titleHelper, textDecoration: 'none' }}
              href="//aragon.org/token"
              target="_blank"
              rel="noopener noreferrer"
            >
              ANT
            </a>{' '}
            — the native token of the Aragon Network.
            <br></br>
            <a
              style={{ color: theme.titleHelper, textDecoration: 'none' }}
              href="//www.placeholder.vc/blog/2020/3/6/aragon-ant-economics"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Read more →
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default TitleElement;
