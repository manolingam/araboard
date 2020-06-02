import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { GraphContainer } from '../../template/graphContainer/GraphContainer';
import { JurorsChart } from '../jurorsChart/jurorsChart';

import UIGraphicTwo from '../../assets/araboard-UI-graphic2.png';

import './AnjMetrics.css';

export function AnjMetrics() {
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);

  const theme = isLight ? lightTheme : darkTheme;
  return (
    <div className="component-container">
      <div className="metric-title-container">
        <h2 style={{ color: theme.metricTitle }}>ANJ Metrics</h2>
        <img src={UIGraphicTwo} height="110px" width="auto" alt="" />
      </div>

      <div className="component-sub-container anj" style={{ borderColor: theme.borderColor }}>
        <div
          className="box-title"
          style={{
            backgroundColor: theme.metricBoxHeaderBg,
            borderColor: theme.borderColor,
          }}
        >
          <h3 style={{ color: theme.metricBoxHeaderTitle }}>ARAGON COURT</h3>
          <h6 style={{ color: theme.metricBoxHelper }}>Read more</h6>
        </div>

        <div className="stats" style={{ backgroundColor: theme.metricBoxBg }}>
          <JurorsChart />
          <GraphContainer
            title="ANJ Activated"
            metric="80.3m"
            metricTitle={theme.secondInSeries}
            metricNumber={theme.metricNumbers}
            pointColor={theme.secondInSeriesPoint}
            axesColor={theme.axesGridLines}
          />
        </div>
      </div>
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
          <GraphContainer
            title="Price"
            metric="$0.18"
            metricTitle={theme.firstInSeries}
            metricNumber={theme.metricNumbers}
            pointColor={theme.firstInSeriesPoint}
            axesColor={theme.axesGridLines}
          />
          <GraphContainer
            title="Supply"
            metric="40m"
            metricTitle={theme.secondInSeries}
            metricNumber={theme.metricNumbers}
            pointColor={theme.secondInSeriesPoint}
            axesColor={theme.axesGridLines}
          />
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
