import React, { useContext } from 'react';
import Switch from '@material-ui/core/Switch';

import { ThemeContext } from '../context/ThemeContext';

import TitleElement from '../components/titleElement/TitleElement';
import { AntMetrics } from '../components/antMetrics/AntMetrics';
import { AnjMetrics } from '../components/anjMetrics/AnjMetrics';

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
    </div>
  );
}
