import React from 'react';
import { AragonCourtMetrics } from '../aragonCourtMetrics/AragonCourtMetrics';
import { AnjSupplyChart } from '../anjSupplyChart/AnjSupplyChart';
import UIGraphicTwo from '../../assets/araboard-UI-graphic2.png';

import './AnjMetrics.css';
import { AnjPriceChart } from '../anjPriceChart/AnjPriceChart';
import { AnjNetworkValueChart } from '../anjNetworkValueChart/anjNetworkValueChart';
import { useTheme } from '../../hooks/useTheme';

export function AnjMetrics() {
  const theme = useTheme();

  return (
    <div className="component-container">
      <div className="metric-title-container">
        <h2 style={{ color: theme.metricTitle }}>ANJ Metrics</h2>
        <img src={UIGraphicTwo} height="110px" width="auto" alt="" />
      </div>
      <AragonCourtMetrics />
      <div className="component-sub-container anj" style={{ borderColor: theme.borderColor }}>
        <div
          className="box-title"
          style={{
            backgroundColor: theme.metricBoxHeaderBg,
            borderColor: theme.borderColor,
          }}
        >
          <h3 style={{ color: theme.metricBoxHeaderTitle }}>ARAGON NETWORK JUROR TOKEN</h3>
          <h6 style={{ color: theme.metricBoxHelper }}>
            <a
              style={{ color: theme.titleHelper, textDecoration: 'none' }}
              href="//aragon.org/court"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
          </h6>
        </div>
        <div className="stats" style={{ backgroundColor: theme.metricBoxBg }}>
          <AnjPriceChart />
          <AnjSupplyChart />
          <AnjNetworkValueChart />
        </div>
      </div>
    </div>
  );
}
