import React, { useContext } from 'react';
import { GraphContainer } from '../../template/graphContainer/GraphContainer';
import { ThemeContext } from '../../context/ThemeContext';
import numeral from 'numeral';
import BigNumber from "bignumber.js";

export function AnjSupplyChart(props) {
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLight ? lightTheme : darkTheme;
  const anjSupply = props.anjSupply

  if (anjSupply.loading) {
    return <>...</>;
  } else if (anjSupply.error) {
    return <>X_X</>;
  } else {
    const timeseries = anjSupply.data.map((point) => {
      return {
        value: Math.round(new BigNumber(point.value).dividedBy(10 ** 18).toNumber()),
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
