import React, { useContext } from 'react';
import Switch from '@material-ui/core/Switch';

import { ThemeContext } from '../context/ThemeContext';

import TitleElement from '../components/titleElement/TitleElement';
import { AntMetrics } from '../components/antMetrics/AntMetrics';
import { AnjMetrics } from '../components/anjMetrics/AnjMetrics';

import RaidGuildBanner from '../assets/raid-guild-banner.png';

export function Main() {
  const { isLight, lightTheme, darkTheme, switchTheme } = useContext(ThemeContext);
  const theme = isLight ? lightTheme : darkTheme;

  return (
    <div className="app" style={{ background: theme.appBackground }}>
      <div className="switch">
        <Switch checked={!isLight} onChange={switchTheme} />
        <p
          style={{
            marginTop: '0px',
            color: theme.titleHelper,
          }}
        >
          Day/Night
        </p>
      </div>
      <TitleElement />
      <AntMetrics />
      <AnjMetrics />
      <footer>
        <a href="https://raidguild.org/" target="_blank" rel="noopener noreferrer">
          <img src={RaidGuildBanner} alt="made by raidguild" width="250px" height="auto" />
        </a>
      </footer>
    </div>
  );
}
