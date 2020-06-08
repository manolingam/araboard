import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import numeral from 'numeral';
import { GraphContainer } from '../../template/graphContainer/GraphContainer';
import { useAntTreasury } from '../../hooks/useAntTreasury';
import { Period } from '../../template/graphContainer/Period';

export function TreasuryChart() {
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLight ? lightTheme : darkTheme;
  const [period, setPeriod] = useState(Period.M1);
  const { loading, error, data } = useAntTreasury(period);

  const handlePeriodChange = (period) => {
    setPeriod(period);
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner">
          <div className="double-bounce1" style={{ backgroundColor: theme.metricNumbers }} />
          <div className="double-bounce2" style={{ backgroundColor: theme.metricNumbers }} />
        </div>
      </div>
    );
  } else if (error) {
    return <>X_X</>;
  } else {
    const graphData = data.map((data) => {
      return {
        value: data.value,
        label: data.timestamp.toLocaleString({ month: 'long', day: '2-digit' }),
      };
    });
    const lastPoint = graphData[graphData.length - 1].value;
    const lastPointFormatted = numeral(lastPoint).format('$0.0a');
    return (
      <GraphContainer
        title="Treasury"
        metric={lastPointFormatted}
        data={graphData}
        defaultPeriod={period}
        onPeriodChange={handlePeriodChange}
        metricTitle={theme.firstInSeries}
        metricNumber={theme.metricNumbers}
        pointColor={theme.firstInSeriesPoint}
        axesColor={theme.axesGridLines}
      />
    );
  }
}
