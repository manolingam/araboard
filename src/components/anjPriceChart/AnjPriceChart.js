import { GraphContainer } from '../../template/graphContainer/GraphContainer';
import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { useAnjPrice } from "../../hooks/useAnjPrice";
import BigNumber from "bignumber.js";
import numeral from "numeral";

export function AnjPriceChart(props) {
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLight ? lightTheme : darkTheme;
  const anjPrice = useAnjPrice(props.anjSupply)

  if (anjPrice.loading) {
    return <>...</>
  } else if (anjPrice.error) {
    return <>X_X</>
  } else {
    const timeseries = anjPrice.data.map((point) => {
      return {
        value: Math.round(new BigNumber(point.value).dividedBy(10 ** 18).toNumber()),
        label: point.timestamp.toLocaleString({ month: 'long', day: '2-digit' }),
      };
    });
    const lastPoint = timeseries[timeseries.length - 1].value;
    const lastPointFormatted = numeral(lastPoint).format('$0.0a');
console.log('timeseries', anjPrice.data)
    return (
      <GraphContainer
        title="Price"
        metric={lastPointFormatted}
        metricTitle={theme.firstInSeries}
        metricNumber={theme.metricNumbers}
        pointColor={theme.firstInSeriesPoint}
        axesColor={theme.axesGridLines}
      />
    );
  }
}
