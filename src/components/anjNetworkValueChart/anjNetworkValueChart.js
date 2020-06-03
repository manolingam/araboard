import { GraphContainer } from '../../template/graphContainer/GraphContainer';
import React, { useContext, useMemo } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import BigNumber from 'bignumber.js';
import numeral from "numeral";

export function AnjNetworkValueChart(props) {
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLight ? lightTheme : darkTheme;

  const anjSupply = props.anjSupply;
  const anjPrice = props.anjPrice;

  const loading = useMemo(() => {
    return anjSupply.loading || anjPrice.loading;
  }, [anjSupply.loading, anjPrice.loading]);

  const error = useMemo(() => {
    return anjSupply.error || anjPrice.error;
  }, [anjSupply.error, anjPrice.error]);

  const timeseries = useMemo(() => {
    if (!loading && !error && anjSupply.data && anjPrice.data) {
      return anjSupply.data.map((supplyPoint) => {
        const pricePoint = anjPrice.data.find((p) => p.timestamp.valueOf() === supplyPoint.timestamp.valueOf());
        const supplyAmount = new BigNumber(supplyPoint.value).div(10 ** 18);
        const usdPrice = pricePoint.value;
        const networkValue = usdPrice * supplyAmount;
        return {
          label: supplyPoint.timestamp.toLocaleString({ month: 'long', day: '2-digit' }),
          value: networkValue,
        };
      });
    }
  }, [loading, error, anjSupply.data, anjPrice.data]);

  const lastPointFormatted = useMemo(() => {
    if (timeseries) {
      const lastPoint = timeseries[timeseries.length - 1].value;
      return numeral(lastPoint).format('$0.0a');
    }
  }, [timeseries]);

  if (loading) {
    return <>...</>;
  } else if (error) {
    return <>X_X</>;
  } else {
    return (
      <GraphContainer
        title="Network Val."
        metric={lastPointFormatted}
        data={timeseries}
        metricTitle={theme.thirdInSeries}
        metricNumber={theme.metricNumbers}
        pointColor={theme.thirdInSeriesPoint}
        axesColor={theme.axesGridLines}
      />
    );
  }
}
