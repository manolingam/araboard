import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { AragonParticipantsChart } from './AragonParticipantsChart';

export function AragonDaoContainer() {
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLight ? lightTheme : darkTheme;

  return (
    <div className="component-sub-container" style={{ borderColor: theme.borderColor }}>
      <div
        className="box-title"
        style={{
          backgroundColor: theme.metricBoxHeaderBg,
          borderColor: theme.borderColor,
        }}
      >
        <h3 style={{ color: theme.metricBoxHeaderTitle }}>ARAGON NETWORK DAO</h3>
        <h6 style={{ color: theme.metricBoxHelper }}>Read more</h6>
      </div>
      <div className="stats ant-metrics-stats" style={{ backgroundColor: theme.metricBoxBg }}>
        <AragonParticipantsChart />
      </div>
    </div>
  );
}
