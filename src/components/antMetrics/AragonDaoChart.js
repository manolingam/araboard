import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import GraphContainer from '../../template/graphContainer/GraphContainer';

export function AragonDaoChart() {
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
        <GraphContainer
          title="Participants"
          metric="20.1k"
          metricTitle={theme.firstInSeries}
          metricNumber={theme.metricNumbers}
          pointColor={theme.firstInSeriesPoint}
          axesColor={theme.axesGridLines}
        />
      </div>
    </div>
  );
}
