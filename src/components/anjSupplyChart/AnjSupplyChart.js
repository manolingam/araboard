import React, { useContext } from 'react';
import { GraphContainer } from '../../template/graphContainer/GraphContainer';
import { ThemeContext } from '../../context/ThemeContext';
import { useAnjSupply } from '../../hooks/useAnjSupply';
import numeral from 'numeral';

export function AnjSupplyChart() {
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLight ? lightTheme : darkTheme;
  const anjSupply = useAnjSupply();

  if (anjSupply.loading) {
    return <>...</>;
  } else if (anjSupply.error) {
    return <>X_X</>;
  } else {
    const timeseries = anjSupply.data.map((point) => {
      return {
        value: point.value,
        label: point.timestamp.toLocaleString({ month: 'long', day: '2-digit' }),
      };
    });
    const lastPoint = timeseries[timeseries.length - 1].value;
    const lastPointFormatted = numeral(lastPoint).format('0.0a');
    return (
      <GraphContainer
        title="Supply"
        metric={lastPointFormatted}
        data={timeseries}
        metricTitle={theme.secondInSeries}
        metricNumber={theme.metricNumbers}
        pointColor={theme.secondInSeriesPoint}
        axesColor={theme.axesGridLines}
      />
    );
  }
}
