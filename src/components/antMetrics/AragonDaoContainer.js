import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { AragonParticipantsChart } from './AragonParticipantsChart';
import { TreasuryChart } from './TreasuryChart';

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
        <h6 style={{ color: theme.metricBoxHelper }}>
          <a
            style={{ color: theme.titleHelper, textDecoration: 'none' }}
            href="//mainnet.aragon.org/#/network"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more
          </a>
        </h6>
      </div>
      <div className="stats ant-metrics-stats" style={{ backgroundColor: theme.metricBoxBg }}>
        <AragonParticipantsChart />
        <TreasuryChart />
      </div>
    </div>
  );
}
