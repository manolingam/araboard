import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { GraphContainer } from '../../template/graphContainer/GraphContainer';
import { AragonCourtMetrics } from '../aragonCourtMetrics/AragonCourtMetrics';
import { AnjSupplyChart } from '../anjSupplyChart/AnjSupplyChart';
import UIGraphicTwo from '../../assets/araboard-UI-graphic2.png';

import './AnjMetrics.css';
import { useLastBlockNumber } from '../../hooks/useLastBlockNumber';
import { AnjPriceChart } from "../anjPriceChart/AnjPriceChart";

export function AnjMetrics() {
  const lastBlockNumber = useLastBlockNumber();
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLight ? lightTheme : darkTheme;

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
          <h6 style={{ color: theme.metricBoxHelper }}>Read more</h6>
        </div>
        <div className="stats" style={{ backgroundColor: theme.metricBoxBg }}>
          <AnjPriceChart/>
          <AnjSupplyChart lastBlockNumber={lastBlockNumber} />
          <GraphContainer
            title="Network Val."
            metric="1.3m"
            metricTitle={theme.thirdInSeries}
            metricNumber={theme.metricNumbers}
            pointColor={theme.thirdInSeriesPoint}
            axesColor={theme.axesGridLines}
          />
        </div>
      </div>
    </div>
  );
}
