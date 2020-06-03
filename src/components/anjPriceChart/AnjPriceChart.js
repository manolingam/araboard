import { GraphContainer } from '../../template/graphContainer/GraphContainer';
import React, { useContext, useMemo } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { useAnjPrice } from '../../hooks/useAnjPrice';
import numeral from 'numeral';

export function AnjPriceChart(props) {
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLight ? lightTheme : darkTheme;
  const anjPrice = useAnjPrice(props.anjSupply);

  const timeseries = useMemo(() => {
    if (anjPrice.data) {
      return anjPrice.data.map((point) => {
        return {
          value: point.value,
          label: point.timestamp.toLocaleString({ month: 'long', day: '2-digit' }),
        };
      });
    }
  }, [anjPrice.data]);

  const lastPointFormatted = useMemo(() => {
    if (timeseries) {
      const lastPoint = timeseries[timeseries.length - 1].value;
      return numeral(lastPoint).format('$0.0a');
    }
  }, [timeseries]);

  if (anjPrice.loading) {
    return <>...</>;
  } else if (anjPrice.error) {
    return <>X_X</>;
  } else {
    return (
      <GraphContainer
        title="Price"
        metric={lastPointFormatted}
        data={timeseries}
        metricTitle={theme.firstInSeries}
        metricNumber={theme.metricNumbers}
        pointColor={theme.firstInSeriesPoint}
        axesColor={theme.axesGridLines}
      />
    );
  }
}
